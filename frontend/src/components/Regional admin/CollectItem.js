//in this page the regional admin check if the customer have an item with the data he give
//and give him the item if everything is ok
import styles from "./CollectItem.module.css";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import { useEffect } from "react";

//Coniguring the firebase
const firebaseConfig = {
  apiKey: "AIzaSyAbr6iHHVwQ9BxycwDdkqeQLLD0kk3twgs",
  authDomain: "us-184db.firebaseapp.com",
  projectId: "us-184db",
  storageBucket: "us-184db.appspot.com",
  messagingSenderId: "310053069316",
  appId: "1:310053069316:web:d22c8f84679e2aa1cc4b51",
  measurementId: "G-S1343SSKC3",
};

// Initialize Firebase app
initializeApp(firebaseConfig);
const auth = getAuth();

function CollectItem() {
  const [userEmail, setUserEmail] = useState("");
  const [cartID, setCartID] = useState("");
  const [error, setError] = useState("");

  //setting user email
  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };
  //setting user cart id
  const handleCartIDvChange = (event) => {
    setCartID(event.target.value);
  };

  //checking with the backend that everything is ok
  useEffect(() => {
    const fetchData = async () => {
      try {
        //if one of the data is null
        if (!userEmail || !cartID) return;

        //setting the url to send to the backend
        const url = `http://localhost:5000/carts/${cartID}`;
        const response = await fetch(url);
        const data = await response.json();

        //looping over the cart to check if the user have an item there
        for (let i = 0; i < data.length; i++) {
          if (data[i].email === userEmail) {
            //setting the data to send to the backend
            let itemCollected = { email: userEmail, cart_id: cartID };
            //sending the data to the backend
            fetch("http://localhost:5000/updateItems", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(itemCollected),
            });
            break;
          } else {
          }
        }
      } catch (error) {
        console.error("Error fetching carts:", error);
      }
    };

    fetchData();
  }, [userEmail, cartID]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //checking if the regional admin added user email
    if (!userEmail) {
      setError("Please enter the customer email");
      return;
    }
    //checking if the regional admin added user cart id
    if (!cartID) {
      setError("Please enter a cart id");
      return;
    }
    try {
      //checking if the user email that the user gave is in the database
      const signInMethods = await fetchSignInMethodsForEmail(auth, userEmail);
      if (signInMethods.length > 0) {
        console.log("Email exists in Firebase Authentication");
      } else {
        console.log("Email does not exist in Firebase Authentication");
        setError("Please try again, the email does not exist in our database");
        return;
      }
    } catch (error) {
      console.log("Error checking email in Firebase Authentication:", error);
    }
  };

  return (
    <form className={styles["collect-form"]} onSubmit={handleSubmit}>
      <label htmlFor="emailToBan">Customer email:</label>
      <input
        className={styles["collect-form__input"]}
        type="text"
        id="emailToBan"
        value={userEmail}
        onChange={handleEmailChange}
      />
      <label htmlFor="cartID">Item's cart id:</label>{" "}
      <input
        className={styles["collect-form__input"]}
        type="text"
        id="cartID"
        value={cartID}
        onChange={handleCartIDvChange}
      />
      {error && <div className={styles["collect-form__error"]}>{error}</div>}
      <button className={styles["collect-form__submit"]} type="submit">
        check item
      </button>
    </form>
  );
}

export default CollectItem;
