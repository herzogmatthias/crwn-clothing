import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import { default as Header } from "./components/header/header.component";
import { SignInAndSignUp } from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { Unsubscribe } from "firebase";
import { IUserAuth } from "./IUserAuth";
import { connect, ConnectedProps } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { RootState } from "./redux/root-reducer";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { default as CheckoutPage } from "./pages/checkout/checkout.component";

interface ISelectorProps {
  currentUser: IUserAuth | null;
}

type IAppProps = ConnectedProps<typeof connector>;

function App({ setCurrentUser, currentUser }: IAppProps) {
  let unsubscripeFromAuth: Unsubscribe = () => {};
  useEffect(() => {
    console.log("I rerender");
  });
  useEffect(() => {
    unsubscripeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef!.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...(snapShot.data() as IUserAuth),
          });
        });
      } else {
        setCurrentUser(null);
      }
    });
  }, [setCurrentUser]);
  useEffect(() => {
    return () => {
      unsubscripeFromAuth();
    };
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
  setCurrentUser: setCurrentUser,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
export default connect(mapStateToProps, mapDispatchToProps)(App);
