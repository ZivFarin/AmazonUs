/**Imports */
import React, { useState, useEffect } from "react";
import BanCard from "../../UI/BanCard";
import styles from "../Customer/CustomerMain.module.css";

/**Here we handle the ban user approval option*/
const handleBanUser = (useremail) => {
  let decision = { email: useremail, decision: "True" };
  fetch("http://localhost:5000/banned_user_ga",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(decision),
    });
};

/**Here we handle the ban user cancel option*/
const handleCancelBanUser = (useremail) => {
  let decision = { email: useremail, decision: "False" };
  fetch("http://localhost:5000/banned_user_ga",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(decision),
    });
};

/**Styling the button*/
const buttonStyle = {
  height: "40px",
  width: "90px",
  backgroundColor: "#BAE7FF",
  color: "black",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  margin: "4px",
};

/**Here is the main function of the component*/
function GeneralAdminMain() {
  /**Declarations*/
  const [banList, setBanList] = useState([]);
  /**Here we get the list of pending ban to approve or cancel */
  useEffect(() => {
    const fetchData = async () => {
      console.clear();
      try {
        // Fetch ban waiting list
        const response = await fetch("http://localhost:5000/banned_user");
        const data = await response.json();
        console.log(data);
        const banList = data;
        banList.map((user) => ({
          email: user.email,
          reason: user.ban_reason,
        }));
        setBanList(banList);
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    };
    fetchData();
  }, []);
  /**Here we display the list and buttons*/
  return (
    <section>
      <h1 className={styles.banner}>Users that are waiting for ban: </h1>
      {banList.map((user) => (
        <BanCard key={user.email}>
          <div className={styles.container}>
            <div className={styles.text}>
              <div>user email: {user.email}</div>
              <div>reason: {user.ban_reason}</div>
            </div>
            <div>
              <button
                style={buttonStyle}
                onClick={() => handleBanUser(user.email)}
              >
                Ban user
              </button>
              <button
                style={buttonStyle}
                onClick={() => handleCancelBanUser(user.email)}
              >
                Cancel
              </button>
            </div>
          </div>
        </BanCard>
      ))}
    </section>
  );
}

export default GeneralAdminMain;
