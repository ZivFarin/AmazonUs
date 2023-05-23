import React, { useState, useEffect } from 'react';
import Card from '../../UI/Card';
import CardRed from '../../UI/CardRed';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";

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

function RegionalAdminMain() {
  const [carts, setCarts] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = auth.currentUser;
      if (user) {
        setUserEmail(user.email);
      }
      console.log(userEmail)
    }, 1000); // Delay of 2 seconds (2000 milliseconds)

    return () => clearTimeout(timer); // Clear the timer if the component unmounts or the dependency array changes
  }, [userEmail]);

  let url = "http://localhost:5000/cart/" + userEmail;
  useEffect(() => {
    const fetchData = async () => {
      console.clear();
      try {
        // Fetch carts
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const carts = data.Carts;
        carts.map((item) => ({
          id: carts.id,
          status: getStatusString(item.status),
        }));
        setCarts(carts);
      } catch (error) {
        console.error("Error fetching carts:", error);
      }
      console.clear();

    };

    fetchData();
  }, [url]);

  

  const getStatusString = (status) => {
    if (status === 1)
      return "Ordered";
    if (status === -1)
      return "Waiting for customer to pay";
    if (status === 0)
      return "Client paid";
    return "";
  };

  const handleNudgeClient = (cartId) => {
    // Logic to nudge the client
    // ...

    // Refresh the cart data after nudging
    fetch('/cart')
      .then(response => response.json())
      .then(data => {
        const cartData = data.map(item => ({
          id: item.id,
          status: getStatusString(item.status),
          status_changed: item.status_change,
        }));
        setCarts(cartData);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  };

  return (
    <section>
      {carts.map(cart => (
        (cart.status === "Ordered") ? (
          <Card key={cart.id}>
            <div>cart id: {cart.id}</div>
            <div>{cart.status}</div>
            <div>{cart.status_changed}</div>
            {(cart.status === "Waiting for customer to pay") && (
              <div>
                <button onClick={() => handleNudgeClient(cart.id)}>Nudge client</button>
              </div>
            )}
          </Card>
        ) : (
          <CardRed key={cart.id}>
            <div>cart id: {cart.id}</div>
            <div>{cart.status}</div>
            <div>{cart.status_changed}</div>
            {(cart.status === "Waiting for customer to pay") && (
              <div>
                <button onClick={() => handleNudgeClient(cart.id)}>Nudge client</button>
              </div>
            )}
          </CardRed>
        )
      ))}
    </section>
  );
}

export default RegionalAdminMain;
