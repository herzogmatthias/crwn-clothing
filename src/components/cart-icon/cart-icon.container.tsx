import { Mutation } from "react-apollo";
import React from "react";
import CartIcon from "./cart-icon.component";
import { TOGGLE_CART_HIDDEN } from "../../graphql/mutations";

const CartIconContainer = () => {
  return (
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
      {(toggleCartHidden: any) => {
        return <CartIcon toggleCartHidden={toggleCartHidden}></CartIcon>;
      }}
    </Mutation>
  );
};

export default CartIconContainer;
