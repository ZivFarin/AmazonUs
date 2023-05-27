import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarRegionalAdmin.module.css";

function NavbarRegionalAdmin() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles["navbar-nav"]}>
        <li className={styles["nav-item"]}>
          <Link to="/RegionalAdminMain" className={styles["nav-link"]}>
            Home
          </Link>
        </li>
        <li className={`${styles["nav-item"]} ${styles["nav-link"]}`}>
          <Link to="/BanUser" className={styles["nav-link"]}>
            Ban
          </Link>
        </li>
        <li className={`${styles["nav-item"]} ${styles["nav-link"]}`}>
          <Link to="/CollectItem" className={styles["nav-link"]}>
            Collect 
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarRegionalAdmin;
