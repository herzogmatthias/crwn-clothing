import * as React from "react";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../redux/root-reducer";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import {
  CartIconContainer,
  ShoppingIconContainer,
  ItemCountContainer,
} from "./cart-icon.styles";
import CartContext from "../../contexts/cart/cart.context";

interface ISelectorProps {
  itemCount: number;
}

type ICartIconProps = ConnectedProps<typeof connector>;

function CartIcon({ itemCount }: ICartIconProps) {
  const { toggleHidden } = React.useContext(CartContext);
  return (
    <CartIconContainer onClick={toggleHidden}>
      <ShoppingIconContainer></ShoppingIconContainer>
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
  );
}

const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  itemCount: selectCartItemsCount,
});

const connector = connect(mapStateToProps, {});
export default connect(mapStateToProps, {})(CartIcon);
