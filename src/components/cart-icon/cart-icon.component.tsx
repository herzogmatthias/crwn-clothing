import * as React from "react";
import {
  CartIconContainer,
  ShoppingIconContainer,
  ItemCountContainer,
} from "./cart-icon.styles";
import { useMutation, useQuery } from "react-apollo";
import { TOGGLE_CART_HIDDEN } from "../../graphql/mutations";
import { GET_ITEM_COUNT } from "../../graphql/queries";

interface ICartIconProps {
  toggleCartHidden?(): void;
  itemCount?: number;
}

function CartIcon(props: ICartIconProps) {
  const [toggleCartHidden] = useMutation<{ toggleCartHidden: () => {} }, {}>(
    TOGGLE_CART_HIDDEN
  );
  const { data, error } = useQuery<{ itemCount: number }>(GET_ITEM_COUNT);

  return (
    <CartIconContainer onClick={() => toggleCartHidden!()}>
      <ShoppingIconContainer></ShoppingIconContainer>
      <ItemCountContainer>{data!.itemCount}</ItemCountContainer>
    </CartIconContainer>
  );
}

export default CartIcon;
