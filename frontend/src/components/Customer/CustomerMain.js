import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import Card from "../../UI/Card";
import Loading from "../../UI/Loading";

const firebaseConfig = {
  apiKey: "AIzaSyAbr6iHHVwQ9BxycwDdkqeQLLD0kk3twgs",
  authDomain: "us-184db.firebaseapp.com",
  projectId: "us-184db",
  storageBucket: "us-184db.appspot.com",
  messagingSenderId: "310053069316",
  appId: "1:310053069316:web:d22c8f84679e2aa1cc4b51",
  measurementId: "G-S1343SSKC3",
};

// Initializing firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function CustomerMain() {
  const [userItems, setUserItems] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email);
      }
    }, 2000); // Delay of 2 seconds (2000 milliseconds)

    return () => clearTimeout(timer); // Clear the timer if the component unmounts or the dependency array changes
  }, []);
  let url = "http://localhost:5000/item/" + userEmail;
  useEffect(() => {
    const fetchData = async () => {
      console.clear();
      try {
        // Fetch user items
        const response = await fetch(url);
        const data = await response.json();
        const itemsData = data.Items;
        itemsData.map((item) => ({
          id: item.id,
          name: item.name,
          url: item.url,
        }));
        setUserItems(itemsData);
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    };

    fetchData();
  }, [url]);
/*Dont forget to add a rendering of cart id into the section*/
  return userEmail === "" ? (
    <Loading />
  ) : (
    <section>
      <h1>Customer main page</h1>
      {userItems.map((item) => (
        <Card key={item.id}>
          <div>cart id: </div>
          <div>item name: {item.name}</div>
          <div>
            item link: <a href={item.url}>click here</a>
          </div>
        </Card>
      ))}
    </section>
  );
}

export default CustomerMain;
