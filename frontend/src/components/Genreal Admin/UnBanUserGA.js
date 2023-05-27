import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import styles from "../Regional admin/BanUser.module.css";

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

function UnBanUserGA() {
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
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
    let userBan = { email: userEmail};
    fetch("http://localhost:5000/unban_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userBan),
    });
  };

  const handleInputChange = (event) => {
    setUserEmail(event.target.value);
    setError("");
  };

  return (
    <form className={styles["ban_user-form"]} onSubmit={handleSubmit}>
      <label htmlFor="emailToBan">Add user email here</label>
      <input
        className={styles["ban_user-form__input"]}
        type="text"
        id="userEmail"
        value={userEmail}
        onChange={handleInputChange}
      />
      {error && <div className={styles["ban_user-form__error"]}>{error}</div>}
      <button className={styles["ban_user-form__submit"]} type="submit">
        Unban
      </button>
    </form>
  );
};

export default UnBanUserGA;
