import * as React from "react";
import CartItem from "../cart-item/cart-item.component";
import { ICartItem } from "../../redux/cart/ICartItem";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  CustomButtonContainer,
  EmptyMessageContainer,
  CartDropdownContainer,
  CartItemsContainer,
} from "./cart-dropdown.styles";

interface ICartDropdownProps extends RouteComponentProps {
  cartItems: ICartItem[];
  toggleCartHidden(): void;
}

function CartDropdown({
  cartItems,
  history,
  toggleCartHidden,
}: ICartDropdownProps) {
  return (
    <CartDropdownContainer className="cart-dropdown">
      <CartItemsContainer>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem}></CartItem>
          ))
        ) : (
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        )}
      </CartItemsContainer>
      <CustomButtonContainer
        onClick={() => {
          history.push("/checkout");
          toggleCartHidden();
        }}
      >
        GO TO CHECKOUT
      </CustomButtonContainer>
    </CartDropdownContainer>
  );
}

export default withRouter(CartDropdown);
