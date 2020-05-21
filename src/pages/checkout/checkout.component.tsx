import * as React from "react";
import { ConnectedProps, connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { selectCartTotal } from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  TestWarningContainer,
  StripeButtonContainer,
} from "./Checkout.styles";
import { CartContext } from "../../providers/cart/cart.provider";

interface ICheckoutPageProps {}

function CheckoutPage(props: ICheckoutPageProps) {
  const { cartItems, total } = React.useContext(CartContext);
  return (
    <CheckoutPageContainer>
      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {cartItems.map((cartItem) => {
        return (
          <CheckoutItem cartItem={cartItem} key={cartItem.id}></CheckoutItem>
        );
      })}
      <TotalContainer>
        <span>TOTAL: ${total}</span>
      </TotalContainer>
      <TestWarningContainer>
        *Please use the following test credit card for payments*
        <br /> 4242 4242 4242 4242 - Exp: 01/21 - CVV: 123
      </TestWarningContainer>
      <StripeButtonContainer price={total}></StripeButtonContainer>
    </CheckoutPageContainer>
  );
}

export default CheckoutPage;
