import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from "./PayPalButton.module.css";
import { useHistory } from "react-router-dom";

const PayPalButton = ({ item }) => {
  const history = useHistory();
  const handlePaymentSuccess = (details) => {
    // Perform your fetch request here with the captured order details
    let itemPay = { item_id: item.id };
    fetch("http://localhost:5000/paypal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemPay),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data as needed
        history.push("/CustomerMain");
        history.go(0);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AenS6yd4eVo7_-_cpoeRU9YkENVVOwZZuHowJowFcoS46XyEpxPfkWItC6s7GCiedpOivmM-fOMAeaxa",
      }}
    >
      <PayPalButtons
        className={styles["body"]}
        fundingSource="paypal"
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
            handlePaymentSuccess(details); // Call the handler function with the captured order details
          });
        }}
        onError={(error) => {
          console.error("PayPal SDK Error:", error);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;