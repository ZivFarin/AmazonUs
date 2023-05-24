import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButtonsComponent = ({ item }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AenS6yd4eVo7_-_cpoeRU9YkENVVOwZZuHowJowFcoS46XyEpxPfkWItC6s7GCiedpOivmM-fOMAeaxa",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: item.price,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert(
              "Transaction completed by " +
                details.payer.name.given_name +
                ". Thank you for your money :)"
            );
            // Your code here after capturing the order
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButtonsComponent;