import * as React from "react";
import CartItem from "../cart-item/cart-item.component";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  CustomButtonContainer,
  EmptyMessageContainer,
  CartDropdownContainer,
  CartItemsContainer,
} from "./cart-dropdown.styles";
import { CartContext } from "../../providers/cart/cart.provider";

interface ICartDropdownProps extends RouteComponentProps {}

function CartDropdown({ history }: ICartDropdownProps) {
  const { cartItems, toggleHidden } = React.useContext(CartContext);
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
          toggleHidden();
        }}
      >
        GO TO CHECKOUT
      </CustomButtonContainer>
    </CartDropdownContainer>
  );
}

export default withRouter(CartDropdown);
