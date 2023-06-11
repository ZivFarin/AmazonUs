/**Imports*/
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import styles from "../Regional admin/BanUser.module.css";
/**Configuring firebase to our specific project*/
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
/**Here is the main function of the component*/
function UnBanUserGA() {
  /**Declarations*/
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  /**This handles the unban by sending the banneduser email to the back to remove him from bannenuser db*/
  const handleSubmit = async (event) => {
    event.preventDefault();
    /**see if email exists or not*/
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, userEmail);
      if (signInMethods.length > 0) {
      } else {
        setError("Please try again, the email does not exist in our database");
        return;
      }
    } catch (error) {
      console.log("Error checking email in Firebase Authentication:", error);
    }
    /**For fetch to unban*/
    let userBan = { email: userEmail };
    if (window.confirm("Are you sure you want to unban this person")) {
      fetch("http://localhost:5000/unban_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userBan),
      });
    } else {
      history.push("/UnBanUserGA");
      history.go(0);
    }
    alert("You have chosen to unban the user: " + userEmail);
    history.push("/UnBanUserGA");
    history.go(0);
  };
  /**Handles input change*/
  const handleInputChange = (event) => {
    setUserEmail(event.target.value);
    setError("");
  };
  /**Here we render*/
  return (
    <form className={styles["ban_user-form"]} onSubmit={handleSubmit}>
      <label htmlFor="emailToBan">Add user email here</label>
      <input
        className={styles["ban_user-form__input"]}
        type="text"
        id="userEmail"
        placeholder="Email"
        value={userEmail}
        onChange={handleInputChange}
      />
      {error && <div className={styles["ban_user-form__error"]}>{error}</div>}
      <button className={styles["ban_user-form__submit"]} type="submit">
        Unban
      </button>
    </form>
  );
}

export default UnBanUserGA;
