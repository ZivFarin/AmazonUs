import React, { useState } from 'react';
import Card from '../../UI/Card';
import CardRed from '../../UI/CardRed';

const dummyArr = [
  { "id": 1, "status": 1, "status_changed": "the date 1" },
  { "id": 2, "status": -1, "status_changed": "the date 2" },
  { "id": 3, "status": 0, "status_changed": "the date 3" }
];

//changing the status from a number to the suitabe string
for (const i in dummyArr) {
  if (dummyArr[i].status === 1)
    dummyArr[i].status = "Ordered";
  if (dummyArr[i].status === -1)
    dummyArr[i].status = "Waiting for customer to pay";
  if (dummyArr[i].status === 0)
    dummyArr[i].status = "Client paid";
}

function RegionalAdminMain() {
  const [carts, setCarts] = useState([]);

  useState(() => {
    const cartData = dummyArr.map(item => ({
      id: item.id,
      status: item.status,
      status_changed: item.status_changed,
    }));

    setCarts(cartData);
  }, []);

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
                <button>Nudge client</button>
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
                <button>Nudge client</button>
              </div>
            )}
          </CardRed>
        )
      ))}
    </section>
  );
}

export default RegionalAdminMain;
