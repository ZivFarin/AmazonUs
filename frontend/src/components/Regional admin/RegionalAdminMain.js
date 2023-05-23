import React, { useState, useEffect } from 'react';
import Card from '../../UI/Card';
import CardRed from '../../UI/CardRed';

function RegionalAdminMain() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    // Fetch cart data from the backend
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
  }, []);

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
