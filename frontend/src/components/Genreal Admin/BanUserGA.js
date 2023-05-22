import React, { useState } from "react";
const [userEmail, setUserEmail] = useState("");
import styles from "../Regional admin/BanUser.module.css";

function BanUserGA() {
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
        Submit
      </button>
    </form>
  );
}

export default BanUserGA;