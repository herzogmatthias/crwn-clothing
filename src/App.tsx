import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import { SignInAndSignUp } from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { Unsubscribe } from "firebase";
import { IUserAuth } from "./IUserAuth";
import CheckoutPage from "./pages/checkout/checkout.component";
import CurrentUserContext from "./contexts/current-user/current-user.context";

interface IAppProps {}

function App(props: IAppProps) {
  const [currentUser, setCurrentUser] = React.useState<IUserAuth | null>(null);
  let unsubscripeFromAuth: Unsubscribe;
  useEffect(() => {
    unsubscripeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef!.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...(snapShot.data() as Omit<IUserAuth, "id">),
          });
        });
      } else {
        setCurrentUser(null);
      }
    });
  }, []);
  useEffect(() => {
    return () => {
      unsubscripeFromAuth();
    };
  }, []);
  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header></Header>
      </CurrentUserContext.Provider>
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

export default App;
