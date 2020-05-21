import * as React from "react";
import {
  CartIconContainer,
  ShoppingIconContainer,
  ItemCountContainer,
} from "./cart-icon.styles";
import { CartContext } from "../../providers/cart/cart.provider";

interface ICartIconProps {}

function CartIcon(props: ICartIconProps) {
  const { toggleHidden, cartItemsCount } = React.useContext(CartContext);
  return (
    <CartIconContainer onClick={toggleHidden}>
      <ShoppingIconContainer></ShoppingIconContainer>
      <ItemCountContainer>{cartItemsCount}</ItemCountContainer>
    </CartIconContainer>
  );
}

export default CartIcon;
