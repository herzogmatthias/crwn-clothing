import { ApolloCurrentQueryResult } from "apollo-boost";
import React from "react";
import CheckoutPage from "./checkout.component";
import { flowRight } from "lodash";
import { GET_TOTAL, GET_CART_ITEMS } from "../../graphql/queries";
import { graphql } from "react-apollo";
import { ICartItem } from "../../graphql/ICartItem";

interface IWithGraphqlProps {
  totalQuery: ApolloCurrentQueryResult<{}> & { total: number };
  cartItemsQuery: ApolloCurrentQueryResult<{}> & { cartItems: ICartItem[] };
}

const withGraphql = ({
  totalQuery: { total },
  cartItemsQuery: { cartItems },
}: IWithGraphqlProps) => {
  return <CheckoutPage total={total} cartItems={cartItems}></CheckoutPage>;
};

export default flowRight(
  graphql<{}, { total: number }>(GET_TOTAL, { name: "totalQuery" }),
  graphql<{}, { cartItems: ICartItem[] }>(GET_CART_ITEMS, {
    name: "cartItemsQuery",
  })
)(withGraphql);
