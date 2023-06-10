/**Imports */
import styles from "./GetInTouch.module.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

/**Firebase configuration for us specific*/
const firebaseConfig = {
  apiKey: "AIzaSyAbr6iHHVwQ9BxycwDdkqeQLLD0kk3twgs",
  authDomain: "us-184db.firebaseapp.com",
  projectId: "us-184db",
  storageBucket: "us-184db.appspot.com",
  messagingSenderId: "310053069316",
  appId: "1:310053069316:web:d22c8f84679e2aa1cc4b51",
  measurementId: "G-S1343SSKC3",
};

/**Initializing firebase */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**Main component function */
function YouAreBanned() {
  /**Declarations */
  const [userEmail, setUserEmail] = useState("");
  const [banReason, setBanReason] = useState("");

  /**Here we get the user email from firebase*/
  useEffect(() => {
    const timer = setTimeout(() => {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email);
      }
    }, 2000); /**Delay of 2 seconds (2000 milliseconds)*/

    return () =>
      clearTimeout(
        timer
      ); /**Clear the timer if the component unmounts or the dependency array changes*/
  }, []);

  /**For fetch*/
  let url = "http://localhost:5000/banned_user/reason/" + userEmail;
  /**Here we fetch the check if the user is indeed banned to give him the ban reason */
  useEffect(() => {
    const fetchData = async () => {
      console.clear();
      try {
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            /**Here we set the ban reason to display it*/
            setBanReason(data.ban_reason);
          });
      } catch (error) {
        /**In case there was an error in the fetch for us not for anyone who using the site*/
        console.error("Error fetching user items:", error);
      }
    };
    fetchData();
  }, [url]);
  /**Here we render out what will be on the screen, in this component it's the reason and constant strings*/
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>unfortunately you got banned...</h2>
      <p className={styles.text}>Ban reason:&nbsp; {banReason}</p>
      <p className={styles.text}>
        If you think that this ban is unjustified, contact us at: <br />
        <br />
        E-mail: AUSupport@gmail.com
        <br />
        <br />
        Phone: +972505000000
      </p>
      <p className={styles.text}>
        <br />
        AmazonUs team
      </p>
    </div>
  );
}

export default YouAreBanned;
