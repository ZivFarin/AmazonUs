import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import styles from "./BanUser.module.css";

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

const BanUser = () => {
  const [userEmail, setUserEmail] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setUserEmail(event.target.value);
  };
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!reason) {
      setError("Please enter a reason for the ban");
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
  
    let userBan = { email: userEmail, ban_reason: reason };
    console.log(userBan);
    fetch("http://localhost:5000/banned_user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userBan),
        });
  };
  
  return (
    <form className={styles["ban_user-form"]} onSubmit={handleSubmit}>
      <label htmlFor="emailToBan">Add the email of the user you want to ban:</label>
      <input
        className={styles["ban_user-form__input"]}
        type="text"
        id="emailToBan"
        value={userEmail}
        onChange={handleInputChange}
      />
         <label htmlFor="banReason">Reason for banning:</label> 
    <input
      className={styles["ban_user-form__input"]}
      type="text"
      id="banReason"
      value={reason}
      onChange={handleReasonChange}
    />
      {error && <div className={styles["ban_user-form__error"]}>{error}</div>}
      <button className={styles["ban_user-form__submit"]} type="submit">
        Ban User
      </button>
    </form>
  );
};


export default BanUser;
