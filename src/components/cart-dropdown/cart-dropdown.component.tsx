import * as React from "react";
import "./cart-dropdown.styles.scss";
import { CustomButton } from "../custom-button/custom-button.component";
import { RootState } from "../../redux/root-reducer";
import { ConnectedProps, connect, useDispatch } from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { ICartItem } from "../../redux/cart/ICartItem";
import { createStructuredSelector } from "reselect";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { TOGGLE_CART_HIDDEN } from "../../redux/cart/cart.types";

interface ISelectorProps {
  cartItems: ICartItem[];
}

type ICartDropdownProps = ConnectedProps<typeof connector> &
  RouteComponentProps;

function CartDropdown({ cartItems, history }: ICartDropdownProps) {
  const dispatch = useDispatch();
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem}></CartItem>
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          dispatch({ type: TOGGLE_CART_HIDDEN });
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
}

const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  cartItems: selectCartItems,
});

const connector = connect(mapStateToProps, {});
export default withRouter(connect(mapStateToProps, {})(CartDropdown));
