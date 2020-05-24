import React from "react";
import { TOGGLE_CART_HIDDEN } from "../../graphql/mutations";
import { Mutation, Query } from "react-apollo";
import { GET_CART_ITEMS } from "../../graphql/queries";
import { ICartItem } from "../../graphql/ICartItem";
import CartDropdown from "./cart-dropdown.component";

const CartDropdownContainer = () => {
  return (
    <Mutation<{ toggleCartHidden: () => {} }, {}> mutation={TOGGLE_CART_HIDDEN}>
      {(toggleCartHidden) => (
        <Query<{ cartItems: ICartItem[] }, {}> query={GET_CART_ITEMS}>
          {({ data, loading }) => {
            const { cartItems } = data!;
            return (
              <CartDropdown
                cartItems={cartItems}
                toggleCartHidden={toggleCartHidden}
              ></CartDropdown>
            );
          }}
        </Query>
      )}
    </Mutation>
  );
};

export default CartDropdownContainer;
