/**Imports */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import styles from "./AddItemURL.module.css";
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
function AddItemURL() {
  /**Declarations */
  const [itemUrl, setItemUrl] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const amazonstr1 = "https://www.amazon.com/";
  const amazonstr2 = "www.amazon.com/";
  const amazonstr3 = "amazon.com/";
  /**This function handles the item url submit*/
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!itemUrl) {
      setError("Please enter an item URL");
      return;
    } else if (
      /**Checking if the url is valid*/
      itemUrl.trim().slice(0, 23) !== amazonstr1 &&
      itemUrl.trim().slice(0, 0) === "h"
    ) {
      setError("URL isn't matching the amazon domain");
      return;
    } else if (
      itemUrl.trim().slice(0, 15) !== amazonstr2 &&
      itemUrl.trim().slice(0, 0) === "w"
    ) {
      setError("URL isn't matching the amazon domain");
      return;
    } else if (
      itemUrl.trim().slice(0, 11) !== amazonstr3 &&
      itemUrl.trim().slice(0, 0) === "a"
    ) {
      setError("URL isn't matching the amazon domain");
      return;
    } else {
      try {
        /**Regex to take item name from the url*/
        const title = itemUrl.match(/\/([a-zA-Z0-9-]+)\/dp\//)[1];
        /**Confirm the upload*/
        if (
          window.confirm(
            "You want to upload the item " + title.replaceAll("-", " ")
          )
        ) {
          /**For API*/
          let userEmailToSend = auth.currentUser.email;
          let userURL = { url: itemUrl, email: userEmailToSend };
          /**Fetching*/
          fetch("http://localhost:5000/item", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userURL),
          });
        } else {
          history.push("/addItem");
          history.go(0);
        }
        /**Telling the user he uploaded*/
        alert("You have chosen to upload your item, thank you");
        history.push("/addItem");
        history.go(0);
      } catch {
        /**In case there was a problem with the item*/
        alert("There was a problem with your item, please upload another item");
        history.push("/addItem");
        history.go(0);
      }
    }
  };

  /**This handles the change in input*/
  const handleInputChange = (event) => {
    setItemUrl(event.target.value);
    setError("");
  };

  /**Here we render out what will be on the screen*/
  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <label htmlFor="itemUrl">Add your item URL here:</label>
      <input
        className={styles["login-form__input"]}
        type="text"
        id="itemUrl"
        value={itemUrl}
        onChange={handleInputChange}
      />
      {/**In case there's an error display it*/}
      {error && <div className={styles["login-form__error"]}>{error}</div>}
      <button className={styles["login-form__submit"]} type="submit">
        Submit
      </button>
    </form>
  );
}

export default AddItemURL;
