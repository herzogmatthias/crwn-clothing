import * as React from "react";
import { ICartItem } from "../../redux/cart/ICartItem";
import { default as CheckoutItem } from "../../components/checkout-item/checkout-item.container";
import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  TestWarningContainer,
  StripeButtonContainer,
} from "./Checkout.styles";
import { useQuery } from "react-apollo";
import { GET_TOTAL, GET_CART_ITEMS } from "../../graphql/queries";

interface ICheckoutPageProps {
  cartItems?: ICartItem[];
  total?: number;
}

function CheckoutPage(props: ICheckoutPageProps) {
  const totalQuery = useQuery<{ total: number }>(GET_TOTAL);
  const cartItemsQuery = useQuery<{ cartItems: ICartItem[] }>(GET_CART_ITEMS);
  const { total } = totalQuery.data!;
  const { cartItems } = cartItemsQuery.data!;
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
      {cartItems!.map((cartItem) => {
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
      <StripeButtonContainer price={total!}></StripeButtonContainer>
    </CheckoutPageContainer>
  );
}

export default CheckoutPage;
