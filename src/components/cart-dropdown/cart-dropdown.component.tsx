import * as React from "react";
import { RootState } from "../../redux/root-reducer";
import { ConnectedProps, connect } from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { ICartItem } from "../../redux/cart/ICartItem";
import { createStructuredSelector } from "reselect";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  CustomButtonContainer,
  EmptyMessageContainer,
  CartDropdownContainer,
  CartItemsContainer,
} from "./cart-dropdown.styles";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

interface ISelectorProps {
  cartItems: ICartItem[];
}

type ICartDropdownProps = ConnectedProps<typeof connector> &
  Partial<RouteComponentProps>;

export function CartDropdown({
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
          history!.push("/checkout");
          toggleCartHidden();
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

const mapDispatchToProps = {
  toggleCartHidden: toggleCartHidden,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);
