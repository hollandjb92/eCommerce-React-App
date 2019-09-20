import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_b9RMp6V38Gzl06bLHKZ7l7SN00W6qSaEHA";

  const onToken = token => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(response => {
        alert("Payment was successful");
      })
      .catch(error => {
        console.log("Payment error: ", error);
        alert("There was an issue processing your payment.");
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Royalty Clothing Ltd."
      billingAdress
      shippingAddress
      image="https://i.imgur.com/C4VbZJd.png"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
