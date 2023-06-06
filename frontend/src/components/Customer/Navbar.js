import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles["navbar-nav"]}>
        <li className={styles["nav-item"]}>
          <Link to="/CustomerMain" className={styles["nav-link"]}>
            Home
          </Link>
        </li>
        <li className={`${styles["nav-item"]} ${styles["nav-link"]}`}>
          <Link to="/addItem" className={styles["nav-link"]}>
            Add item
          </Link>
        </li>
        <li className={`${styles["nav-item"]} ${styles["nav-link"]}`}>
          <Link to="/getInTouch" className={styles["nav-link"]}>
            Contact 
          </Link>
        </li>
        <li className={`${styles["nav-item"]} ${styles["nav-link"]}`}>
          <Link to="/AboutUs" className={styles["nav-link"]}>
            About Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
