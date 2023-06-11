//Login data including the login form and auth using firebase api
//this page have the logic to sign customer, general admin, regional admin or banned customer
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styles from "./Login.module.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Link } from "react-router-dom";

//connecting to the firebase project
const firebaseConfig = {
  apiKey: "AIzaSyAbr6iHHVwQ9BxycwDdkqeQLLD0kk3twgs",
  authDomain: "us-184db.firebaseapp.com",
  projectId: "us-184db",
  storageBucket: "us-184db.appspot.com",
  messagingSenderId: "310053069316",
  appId: "1:310053069316:web:d22c8f84679e2aa1cc4b51",
  measurementId: "G-S1343SSKC3",
};

//initialazing firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //handling the login to the system
  const handleLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        fetch("http://localhost:5000/regional_admin/" + email, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const id = data.id;
            if (typeof id === "number") {
              localStorage.setItem("isLoggedIn", "Regional");
              history.push("/RegionalAdminMain");
              history.go(0);
            } else if (email === "dbm@gmail.com") {
              localStorage.setItem("isLoggedIn", "General");
              history.push("/GeneralAdminMain");
              history.go(0);
            } else {
              fetch("http://localhost:5000/login/" + email, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((banned) => {
                  if (banned.banned_user === "True") {
                    localStorage.setItem("isLoggedIn", "BannedCustomer");
                    history.push("/YouAreBanned");
                    history.go(0);
                  } else {
                    localStorage.setItem("isLoggedIn", "Customer");
                    history.push("/CustomerMain");
                    history.go(0);
                  }
                });
            }
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  // If user is already logged in, redirect to the customerMain page
  if (localStorage.getItem("isLoggedIn") === "Customer") {
    history.push("/CustomerMain");
    history.go(0);
  } else if (localStorage.getItem("isLoggedIn") === "Regional") {
    history.push("/RegionalAdminMain");
    history.go(0);
  } else if (localStorage.getItem("isLoggedIn") === "General") {
    history.push("/GeneralAdminMain");
    history.go(0);
  } else if (localStorage.getItem("isLoggedIn") === "BannedCustomer") {
    history.push("/YouAreBanned");
    history.go(0);
  }

  const passwordResetHandler = () => {

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log(email + "2");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode + "3");
        console.log(errorMessage + "4");
      });
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        className={styles["login-form__input"]}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className={styles["login-form__input"]}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {error && <div className={styles["login-form__error"]}>{error}</div>}
      <button type="submit" className={styles["login-form__submit"]}>
        Login
      </button>
      <button
        type="button"
        className={styles["login-form__submit"]}
        onClick={passwordResetHandler}
      >
        Forgot password
      </button>
      <Link to="/signup" className={styles["signup-form__submit"]}>
        Create account
      </Link>
    </form>
  );
}
export default withRouter(Login);
