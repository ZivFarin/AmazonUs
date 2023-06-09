import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import Card from "../../UI/Card";
import Loading from "../../UI/Loading";
import PayPalButton from "./PayPalButton";
import styles from "./CustomerMain.module.css";

const firebaseConfig = {
  apiKey: "AIzaSyAbr6iHHVwQ9BxycwDdkqeQLLD0kk3twgs",
  authDomain: "us-184db.firebaseapp.com",
  projectId: "us-184db",
  storageBucket: "us-184db.appspot.com",
  messagingSenderId: "310053069316",
  appId: "1:310053069316:web:d22c8f84679e2aa1cc4b51",
  measurementId: "G-S1343SSKC3",
};

// Initializing firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function CustomerMain() {
  const [userItems, setUserItems] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [searchField, setSearchField] = useState("");
  const [userItemsArray, setUserItemsArray] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email);
      }
    }, 2000); // Delay of 2 seconds (2000 milliseconds)

    return () => clearTimeout(timer); // Clear the timer if the component unmounts or the dependency array changes
  }, []);
  let url = "http://localhost:5000/item/" + userEmail;
  useEffect(() => {
    const fetchData = async () => {
      console.clear();
      try {
        // Fetch user items
        const response = await fetch(url);
        const data = await response.json();
        const itemsData = data.Items;
        itemsData.map((item) => ({
          id: item.id,
          name: item.name,
          url: item.url,
          price: item.price,
          cartId: item.cart_id,
        }));
        setUserItems(itemsData);
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    };

    fetchData();
  }, [url]);
  const getSort = () => {
    var select = document.getElementById("Sort");
    var selectedSort = select.value;
    let userSort = { order: selectedSort, email: userEmail };
    const fetchData = async () => {
      try {
        // Fetch user items
        fetch("http://localhost:5000/sort", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userSort),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const itemsData = data.Items;
            itemsData.map((item) => ({
              id: item.id,
              name: item.name,
              url: item.url,
              price: item.price,
              cartId: item.cart_id,
            }));
            console.log(itemsData);
            setUserItems(itemsData);
          });
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    };

    fetchData();
  };
  const getSubName = (name) => {
    let limitedString = name.substring(0, 30);
    let lastSpaceIndex = limitedString.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) {
      limitedString = limitedString.substring(0, lastSpaceIndex);
    }
    return limitedString;
  };

  const priceAlert = (item) => {
    if (item.price <= 0) {
      alert("There was a problem with the item: '" +  item.name +"'.\nDelete it and re-uplaod it please");
      //Instead of return, when delete an item exists, delete this item.
      return;
    }
    else{
      return item.price;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserItemsArray(userItems);
    if (searchField !== "") {
      const filteredItems = userItems.filter((element) =>
        element.name.includes(searchField)
      );
      setUserItems(filteredItems);
    } else {
      setUserItems(userItemsArray);
    }
  };

  const handleItemDelete = (itemID) => {
    let itemToDelete = {item_id: itemID} 
    fetch("http://localhost:5000/deleteItem", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(itemToDelete),
          })
  };

  return userEmail === "" ? (
    <Loading />
  ) : (
    <section>
      <h1 className={styles.banner}>Your items are: </h1>
      <select className={styles["sort_select"]} onChange={getSort} id="Sort">
        <option value="" disabled selected>
          Select sort option
        </option>
        <option value="default">Chronological order</option>
        <option value="ascending">Price: low to high</option>
        <option value="descending">Price: high to low</option>
        <option value="bascending">Item name: a-z</option>
        <option value="bdescending">Item name: z-a</option>
        <option value="pending">Pending payment</option>
      </select>
      <form onSubmit={handleSubmit}>
        <input
          className={styles["search"]}
          type="search"
          placeholder="Search an item here"
          id="searchInput"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        />
        <button className={styles["search_button"]} type="submit">
          Search
        </button>
      </form>

      {userItems.map((item) => (
        <Card key={item.id}>
          <div className={styles.container}>
            <div className={styles.text}>
              <div>cart id: {item.cart_id}</div>
              <div>item name: {getSubName(item.name)}</div>
              <div>price: {priceAlert(item)}$</div>
              <div>
                item link: <a href={item.url}>click here</a>
              </div>
            <div>
            {item.status <2 && (
              <div>
                <button className={styles.delete_button} onClick={() => handleItemDelete(item.id)}>Delete</button>
              </div>
            )}
            </div>
            </div>
            {(item.status === 1 || item.status === 0) && (
              <div className={styles.button}>
                <PayPalButton item={item} />
              </div>
            )}
          </div>
        </Card>
      ))}
    </section>
  );
}

export default CustomerMain;
