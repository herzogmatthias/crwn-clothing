import * as React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";

export interface IStripeButtonProps {
  price: number;
}

export default function StripeButton({ price }: IStripeButtonProps) {
  const priceForStripe = price * 100;
  const publishableKey = process.env.REACT_APP_STRIPE_KEY!;
  const _onToken = (token: Token) => {
    console.log(token);
    alert("Payment succesful");
  };

  return (
    <StripeCheckout
      stripeKey={publishableKey}
      panelLabel="Pay Now"
      token={_onToken}
      label="Pay Now"
      name="CRWN Clothing Ltd."
      description={`Your total is $${price}`}
      amount={priceForStripe}
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
    ></StripeCheckout>
  );
}
