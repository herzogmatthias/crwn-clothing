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
import { useMutation } from "react-apollo";
import { TOGGLE_CART_HIDDEN } from "../../graphql/mutations";

interface ISelectorProps {
  itemCount: number;
}

type ICartIconProps = ConnectedProps<typeof connector> & {
  toggleCartHidden?(): void;
};

function CartIcon({ itemCount, toggleCartHidden }: ICartIconProps) {
  /*
  const [toggleCartHidden, { error, data }] = useMutation<{}, {}>(
    TOGGLE_CART_HIDDEN
  );
  console.log(data);
*/
  //console.log(toggleCartHidden!());
  return (
    <CartIconContainer onClick={() => toggleCartHidden!()}>
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
