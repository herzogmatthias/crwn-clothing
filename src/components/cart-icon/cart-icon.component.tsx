import * as React from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { ConnectedProps, connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { RootState } from "../../redux/root-reducer";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

type ICartIconProps = ConnectedProps<typeof connector>;

function CartIcon({ toggleCartHidden, itemCount }: ICartIconProps) {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon"></ShoppingIcon>
      <span className="item-count">{itemCount}</span>
    </div>
  );
}

const mapDispatchToProps = {
  toggleCartHidden: toggleCartHidden,
};

const mapStateToProps = (state: RootState) => ({
  itemCount: selectCartItemsCount(state),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
