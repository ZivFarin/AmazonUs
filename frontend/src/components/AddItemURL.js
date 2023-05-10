import React, { useState } from "react";
import styles from "./AddItemURL.module.css";

function AddItemURL() {
  const [itemUrl, setItemUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!itemUrl) {
      setError("Please enter an item URL");
      return;
    }
    // Handle submit logic here
    console.log("Item URL submitted: ", itemUrl);
  };

  const handleInputChange = (event) => {
    setItemUrl(event.target.value);
    setError("");
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <label htmlFor="itemUrl">Add your item URL here:</label>
      <input
        className={styles["login-form__input"]}
        type="text"
        id="itemUrl"
        value={itemUrl}
        onChange={handleInputChange}
      />
      {error && <p className="login-form__error">{error}</p>}
      <button className={styles["login-form__submit"]} type="submit">
        Submit
      </button>
    </form>
  );
}

export default AddItemURL;
