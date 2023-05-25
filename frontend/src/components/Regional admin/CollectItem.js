import styles from "./CollectItem.module.css";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import { useEffect } from "react";

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

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };
  const handleCartIDvChange = (event) => {
    setCartID(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userEmail || !cartID) return;

        const url = `http://localhost:5000/carts/${cartID}`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        for (let i = 0; i < data.length; i++) {
          if (data[i].email === userEmail) {
            let itemCollected = { email: userEmail, cart_id: cartID };
            fetch("http://localhost:5000/updateItems", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(itemCollected),
            });
            break;
          } else {
            console.log("no");
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

    if (!userEmail) {
      setError("Please enter the customer email");
      return;
    }

    if (!cartID) {
      setError("Please enter a cart id");
      return;
    }
    try {
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
