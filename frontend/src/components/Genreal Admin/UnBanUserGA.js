import React, { useState } from "react";
import styles from "../Regional admin/BanUser.module.css";

function UnBanUserGA() {
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const handleInputChange = (event) => {
    setUserEmail(event.target.value);
    setError("");
  };

  return (
    <form className={styles["ban_user-form"]}>
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
        Un-ban
      </button>
    </form>
  );
}

export default UnBanUserGA;
