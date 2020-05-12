import * as React from "react";
import { RootState } from "../../redux/root-reducer";
import { ConnectedProps, connect, useDispatch } from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { ICartItem } from "../../redux/cart/ICartItem";
import { createStructuredSelector } from "reselect";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { TOGGLE_CART_HIDDEN } from "../../redux/cart/cart.types";
import {
  CustomButtonContainer,
  EmptyMessageContainer,
  CartDropdownContainer,
  CartItemsContainer,
} from "./cart-dropdown.styles";

interface ISelectorProps {
  cartItems: ICartItem[];
}

type ICartDropdownProps = ConnectedProps<typeof connector> &
  RouteComponentProps;

function CartDropdown({ cartItems, history }: ICartDropdownProps) {
  const dispatch = useDispatch();
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
          dispatch({ type: TOGGLE_CART_HIDDEN });
        }}
      >
        GO TO CHECKOUT
      </CustomButtonContainer>
    </CartDropdownContainer>
  );
}

const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  cartItems: selectCartItems,
});

const connector = connect(mapStateToProps, {});
export default withRouter(connect(mapStateToProps, {})(CartDropdown));
