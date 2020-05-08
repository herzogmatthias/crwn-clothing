import * as React from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { ConnectedProps, connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

type ICartIconProps = ConnectedProps<typeof connector>;

function CartIcon({ toggleCartHidden }: ICartIconProps) {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon"></ShoppingIcon>
      <span className="item-count">0</span>
    </div>
  );
}

const mapDispatchToProps = {
  toggleCartHidden: toggleCartHidden,
};
const connector = connect(null, mapDispatchToProps);
export default connect(null, mapDispatchToProps)(CartIcon);
