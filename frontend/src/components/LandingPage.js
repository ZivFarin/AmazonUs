import React from "react";
import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function LandingPage() {
  return (
    
    <div>
      <div className={styles["text-container"]}>
        <h1 className={styles.title}>AmazonUS</h1>
      </div>
      <div className={styles["about"]}>
        <p>
          Welcome to AmzonUS! Our new and exotic website will help all Amazons
          users to buy only what you need.
          <br />
          So what do you need to do?
          <br />
          Just Signup, add your Amazons item URL and relax, We will do the rest
          &#128521;
        </p>
      </div>
      <div className={styles["redirect"]}>
        <Link to="/Login">Login</Link>
        <Link to="/signup">Create account</Link>
      </div>
    </div>
  );
}

export default LandingPage;
