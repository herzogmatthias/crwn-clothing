import React from "react";
import { TOGGLE_CART_HIDDEN } from "../../graphql/mutations";
import { Mutation, Query } from "react-apollo";
import { GET_CART_ITEMS } from "../../graphql/resolvers";
import { ICartItem } from "../../redux/cart/ICartItem";
import { ApolloCurrentQueryResult } from "apollo-boost";
import CartDropdown from "./cart-dropdown.component";

const CartDropdownContainer = () => {
  return (
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
      {(toggleCartHidden: any) => (
        <Query query={GET_CART_ITEMS}>
          {({
            data,
            loading,
          }: ApolloCurrentQueryResult<{ cartItems: ICartItem[] }>) => {
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
