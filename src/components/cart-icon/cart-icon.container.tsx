import { graphql } from "react-apollo";
import React from "react";
import { flowRight } from "lodash";
import CartIcon from "./cart-icon.component";
import { TOGGLE_CART_HIDDEN } from "../../graphql/mutations";
import { GET_ITEM_COUNT } from "../../graphql/resolvers";
import { ApolloCurrentQueryResult } from "apollo-boost";

interface IWithGraphqlProps
  extends ApolloCurrentQueryResult<{ itemCount: number }> {
  toggleCartHidden(): void;
}

const CartIconContainer = ({ data, toggleCartHidden }: IWithGraphqlProps) => {
  return (
    <CartIcon
      itemCount={data!.itemCount}
      toggleCartHidden={toggleCartHidden}
    ></CartIcon>
  );
};

export default flowRight(
  graphql<{}, { itemCount: number }>(GET_ITEM_COUNT),
  graphql<{}, { toggleCartHidden: () => {} }>(TOGGLE_CART_HIDDEN, {
    name: "toggleCartHidden",
  })
)(CartIconContainer);
