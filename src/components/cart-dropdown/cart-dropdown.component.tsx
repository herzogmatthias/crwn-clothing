import * as React from "react";
import CartItem from "../cart-item/cart-item.component";
import { ICartItem } from "../../graphql/ICartItem";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  CustomButtonContainer,
  EmptyMessageContainer,
  CartDropdownContainer,
  CartItemsContainer,
} from "./cart-dropdown.styles";
import { useMutation, useQuery } from "react-apollo";
import { TOGGLE_CART_HIDDEN } from "../../graphql/mutations";
import { GET_CART_ITEMS } from "../../graphql/queries";

interface ICartDropdownProps extends RouteComponentProps {
  cartItems?: ICartItem[];
  toggleCartHidden?(): void;
}

function CartDropdown({ history }: ICartDropdownProps) {
  const [toggleCartHidden] = useMutation<{ toggleCartHidden: () => {} }>(
    TOGGLE_CART_HIDDEN
  );
  const { data } = useQuery<{ cartItems: ICartItem[] }>(GET_CART_ITEMS);
  const { cartItems } = data!;
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
