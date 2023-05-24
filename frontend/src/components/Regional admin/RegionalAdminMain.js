import React, { useState, useEffect } from 'react';
import Card from '../../UI/Card';
import CardRed from '../../UI/CardRed';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import { useHistory } from 'react-router-dom';


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
  const history = useHistory();


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
        const updatedCarts = carts.map((item) => ({
          id: item.id,
          status: getStatusString(item.status),
        }));
        setCarts(updatedCarts);
        
      } catch (error) {
        console.error("Error fetching carts:", error);
      }
      console.clear();

    };

    fetchData();
  }, [url]);

  

  const getStatusString = (status) => {
    if (status === 1){
      console.log("1");
      return "Ordered";
    }
      
    if (status === -1){
      console.log("1");
      return "Waiting for customer to pay";

    }
    if (status === 0){
      console.log("1");
      return "Client paid";

    }
    
    return "";
  };

  const handleCartIdSend = (cartId) => {
    history.push({
      pathname: '/CartInfo',
      state: { cartId: cartId },
    });
  };

  return (
    <section>
      {carts.map((cart) => (
        cart.status === 'Ordered' ? (
          <Card key={cart.id}>
            <div>cart id: {cart.id}</div>
            <div>{cart.status}</div>
            {cart.status === 'Waiting for customer to pay' && (
              <div>
                <button onClick={() => handleCartIdSend(cart.id)}>Go to cart info</button>
              </div>
            )}
          </Card>
        ) : (
          <CardRed key={cart.id}>
            <div>cart id: {cart.id}</div>
            <div>{cart.status}</div>
            {cart.status === 'Waiting for customer to pay' && (
              <div>
                <button onClick={() => handleCartIdSend(cart.id)}>Go to cart info</button>
              </div>
            )}
          </CardRed>
        )
      ))}
    </section>
  );
}

export default RegionalAdminMain;