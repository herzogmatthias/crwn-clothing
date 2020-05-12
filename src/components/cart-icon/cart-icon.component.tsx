import * as React from "react";
import { ConnectedProps, connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { RootState } from "../../redux/root-reducer";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import {
  CartIconContainer,
  ShoppingIconContainer,
  ItemCountContainer,
} from "./cart-icon.styles";

interface ISelectorProps {
  itemCount: number;
}

type ICartIconProps = ConnectedProps<typeof connector>;

function CartIcon({ toggleCartHidden, itemCount }: ICartIconProps) {
  return (
    <CartIconContainer onClick={toggleCartHidden}>
      <ShoppingIconContainer></ShoppingIconContainer>
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
  );
}

const mapDispatchToProps = {
  toggleCartHidden: toggleCartHidden,
};

const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  itemCount: selectCartItemsCount,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
