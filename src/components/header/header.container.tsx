import { Query } from "react-apollo";
import { GET_CART_HIDDEN } from "../../graphql/resolvers";
import { ApolloCurrentQueryResult } from "apollo-boost";
import React from "react";
import Header from "./header.component";
import { IHeaderType } from "../../graphql/types";

const HeaderContainer = () => {
  console.log("Hello");
  return (
    <Query query={GET_CART_HIDDEN}>
      {({ data, loading }: ApolloCurrentQueryResult<IHeaderType>) => {
        const { cartHidden } = data!;
        if (loading) return <Header hidden></Header>;
        return <Header hidden={cartHidden}></Header>;
      }}
    </Query>
  );
};

export default HeaderContainer;
