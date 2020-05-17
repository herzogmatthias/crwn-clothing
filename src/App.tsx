import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import { SignInAndSignUp } from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { IUserAuth } from "./IUserAuth";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "./redux/root-reducer";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import CheckoutPage from "./pages/checkout/checkout.component";
import { checkUserSession } from "./redux/user/user.actions";

interface ISelectorProps {
  currentUser: IUserAuth | null;
}

type IAppProps = ConnectedProps<typeof connector>;

function App({ currentUser, checkUserSession }: IAppProps) {
  useEffect(() => {
    checkUserSession();
    /*
      addCollectionAndDocuments(
        "collections",
        collectionsArray.map(({ title, items }) => ({ title, items })) as Omit<
          ICategory,
          "id" | "routeName"
        >[]
      );
      */
  }, []);

  return (
    <div>
      <Header></Header>
      <Switch>
        <Route path="/shop" component={ShopPage}></Route>
        <Route exact path="/" component={HomePage}></Route>
        <Route
          path="/signIn"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <SignInAndSignUp></SignInAndSignUp>
            )
          }
        ></Route>
        <Route exact path="/checkout" component={CheckoutPage}></Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = {
  checkUserSession: checkUserSession,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connect(mapStateToProps, mapDispatchToProps)(App);
