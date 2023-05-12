import React, { useState } from "react";
import styles from "./AddItemURL.module.css";

function AddItemURL() {
  const [itemUrl, setItemUrl] = useState("");
  const [error, setError] = useState("");
  const amazonstr1 = "https://www.amazon.com/";
  const amazonstr2 = "www.amazon.com/";
  const amazonstr3 = "amazon.com/";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!itemUrl) {
      setError("Please enter an item URL");
      return;
    }
    // Checking if the url is valid
    else if (
      itemUrl.trim().slice(0, 23) !== amazonstr1 &&
      itemUrl.trim().slice(0, 0) === "h"
    ) {
      setError("URL isn't matching the amazon domain");
      return;
    } else if (
      itemUrl.trim().slice(0, 15) !== amazonstr2 &&
      itemUrl.trim().slice(0, 0) === "w"
    ) {
      setError("URL isn't matching the amazon domain");
      return;
    } else if (
      itemUrl.trim().slice(0, 11) !== amazonstr3 &&
      itemUrl.trim().slice(0, 0) === "a"
    ) {
      setError("URL isn't matching the amazon domain");
      return;
    } else {
      const title = itemUrl.match(/\/([a-zA-Z0-9-]+)\/dp\//)[1];
      console.log(title.replaceAll("-", " "));
      window.confirm(
        "You have uploaded the item " + title.replaceAll("-", " ")
      );
      //Here will be the sending json thingy.
      console.log("The item was uploaded successfully " + itemUrl);
    }
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
      {error && <div className={styles["login-form__error"]}>{error}</div>}
      <button className={styles["login-form__submit"]} type="submit">
        Submit
      </button>
    </form>
  );
}

export default AddItemURL;
