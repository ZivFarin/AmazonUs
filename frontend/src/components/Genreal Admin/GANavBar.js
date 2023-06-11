/**Imports */
import React from "react";
import { Link } from "react-router-dom";
import styles from "../Customer/Navbar.module.css";

/**Here is the main funtion of this component */
function GANavbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles["navbar-nav"]}>
        <li className={styles["nav-item"]}>
          {/**Route in the navbar to general admin main page*/}
          <Link to="/GeneralAdminMain" className={styles["nav-link"]}>
            Home
          </Link>
        </li>
        <li className={`${styles["nav-item"]} ${styles["nav-link"]}`}>
           {/**Route in the navbar to unban user page*/}
          <Link to="/UnBanUserGA" className={styles["nav-link"]}>
            Unban
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default GANavbar;
