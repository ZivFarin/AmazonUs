/**Imports */
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import Card from "../../UI/Card";
import Loading from "../../UI/Loading";
import PayPalButton from "./PayPalButton";
import styles from "./CustomerMain.module.css";
import { useHistory } from "react-router-dom";



/**Firebase configuration for us specific*/
const firebaseConfig = {
  apiKey: "AIzaSyAbr6iHHVwQ9BxycwDdkqeQLLD0kk3twgs",
  authDomain: "us-184db.firebaseapp.com",
  projectId: "us-184db",
  storageBucket: "us-184db.appspot.com",
  messagingSenderId: "310053069316",
  appId: "1:310053069316:web:d22c8f84679e2aa1cc4b51",
  measurementId: "G-S1343SSKC3",
};

/**Initializing firebase */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**Main component function */
function CustomerMain() {
  /**Declarations */
  const [userItems, setUserItems] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [searchField, setSearchField] = useState("");
  const [userItemsArray, setUserItemsArray] = useState([]);
  const history = useHistory();


  /**Here we get the user email from firebase*/
  useEffect(() => {
    const timer = setTimeout(() => {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email);
      }
    }, 2000); /**Delay of 2 seconds (2000 milliseconds)*/

    return () => clearTimeout(timer); /**Clear the timer if the component unmounts or the dependency array changes*/
  }, []);
  /**Fetching using the user email*/
  let url = "http://localhost:5000/item/" + userEmail;
  useEffect(() => {
    const fetchData = async () => {
      console.clear();
      try {
        /**Fetching user items*/
        const response = await fetch(url);
        const data = await response.json();
        const itemsData = data.Items;
        itemsData.map((item) => ({
          /**Mapping the data so it'll be easier to display from json*/
          id: item.id,
          name: item.name,
          url: item.url,
          price: item.price,
          cartId: item.cart_id,
        }));
        setUserItems(itemsData);
      } catch (error) {
        /**In case there was an error in the fetch for us not for anyone who using the site*/
        console.error("Error fetching user items:", error);
      }
    };
    fetchData();
  }, [url]);
  /**This function is for our sorting items by one of the sorting options*/
  const getSort = () => {
    /**Declarations */
    var select = document.getElementById("Sort");
    var selectedSort = select.value;
    /**For sending the info in order to get the items in that sorting option*/
    let userSort = { order: selectedSort, email: userEmail };
    const fetchData = async () => {
      try {
        /**Fetch user items in a sorted way*/
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
              /**Mapping the sorted items data*/
              id: item.id,
              name: item.name,
              url: item.url,
              price: item.price,
              cartId: item.cart_id,
            }));
            setUserItems(itemsData);
          });
      } catch (error) {
        /**In case there was an error like the error in prior fetch*/
        console.error("Error fetching user items:", error);
      }
    };

    fetchData();
  };
  /**This is to limit the name display to display a cleaner view*/
  const getSubName = (name) => {
    /**Declarations */
    let limitedString = name.substring(0, 30);
    let lastSpaceIndex = limitedString.lastIndexOf(" ");
    /**Checking the space index and cutting at last space if not at 30*/
    if (lastSpaceIndex !== -1) {
      limitedString = limitedString.substring(0, lastSpaceIndex);
    }
    return limitedString;
  };
  /**This is checking if there was a problem with the price in db and to inform in case there was*/
  const priceAlert = (item) => {
    /**Checking the price*/
    if (item.price <= 0) {
      alert(
        "There was a problem with the item: '" +
          item.name +
          "'.\nIt will be deleted, please re-upload the item.\n"+
          "If the problem continue to exists, please contact our support."
      );
      handleItemDelete(item.id);
      return;
    } else {
      return item.price;
    }
  };
  /**This handles the search items submit*/
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
  /**This handles the delete item when the delete button is pressed*/
  const handleItemDelete = (itemID,itemName) => {
    let itemToDelete = { item_id: itemID };
    if(window.confirm("Are you sure you want to delete" + itemName)){
      fetch("http://localhost:5000/deleteItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemToDelete),
    });
    history.push("/CustomerMain");
    history.go(0);
  }
  else{
    return;
  }
  };
  /**Here we render out what will be on the screen*/
  return userEmail === "" ? (
    <Loading />
  ) : (
    <section>
      <h1 className={styles.banner}>Your items are: </h1>
      {/**Here is the sorting and options for sorting*/}
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
      {/**Here is the search*/}
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
      {/**Here we render the items*/}
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
                {item.status < 2 && (
                  <div>
                    {/**Here we add the delete*/}
                    <button
                      className={styles.delete_button}
                      onClick={() => handleItemDelete(item.id,item.name)}
                    >
                      Delete
                    </button>
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
