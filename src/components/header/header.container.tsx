import { Query } from "react-apollo";
import { GET_CART_HIDDEN, GET_CURRENT_USER } from "../../graphql/queries";
import React from "react";
import Header from "./header.component";
import { IUserAuth } from "../../IUserAuth";

const HeaderContainer = () => {
  console.log("Hello");
  return (
    <Query<{ currentUser: IUserAuth | null }> query={GET_CURRENT_USER}>
      {(resCurrentUser) => {
        return (
          <Query<{ cartHidden: boolean }> query={GET_CART_HIDDEN}>
            {(resCartHidden) => {
              return (
                <Header
                  currentUser={resCurrentUser.data?.currentUser}
                  hidden={resCartHidden.data?.cartHidden}
                ></Header>
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};

export default HeaderContainer;
