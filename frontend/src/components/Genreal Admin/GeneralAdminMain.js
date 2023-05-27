import React, { useState, useEffect } from "react";
import BanCard from "../../UI/BanCard";
import styles from "../Customer/CustomerMain.module.css";

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
    //window.location.reload();
};
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
    //window.location.reload();
};
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

function GeneralAdminMain() {
  const [banList, setBanList] = useState([]);
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
