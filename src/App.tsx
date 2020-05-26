import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/header.component";
import { IUserAuth } from "./IUserAuth";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "./redux/root-reducer";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { checkUserSession } from "./redux/user/user.actions";
import { GlobalStyle } from "./global.styles";
import Spinner from "./components/spinner/spinner.component";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SignInAndSignUp = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);

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
      <GlobalStyle></GlobalStyle>
      <Header></Header>
      <Switch>
        <Suspense fallback={<Spinner></Spinner>}>
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
        </Suspense>
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
