import * as React from "react";
import "./cart-dropdown.styles.scss";
import { CustomButton } from "../custom-button/custom-button.component";
import { RootState } from "../../redux/root-reducer";
import { ConnectedProps, connect } from "react-redux";
import CartItem from "../cart-item/cart-item.component";

type ICartDropdownProps = ConnectedProps<typeof connector>;

function CartDropdown({ cartItems }: ICartDropdownProps) {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem}></CartItem>
        ))}
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
}

const mapStateToProps = ({ cart: { cartItems } }: RootState) => ({
  cartItems: cartItems,
});

const connector = connect(mapStateToProps, {});
export default connect(mapStateToProps, {})(CartDropdown);
