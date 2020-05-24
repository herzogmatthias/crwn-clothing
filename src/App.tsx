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
import { default as CheckoutPage } from "./pages/checkout/checkout.component";
import { useMutation, useQuery } from "react-apollo";
import { SET_CURRENT_USER } from "./graphql/mutations";
import { GET_CURRENT_USER } from "./graphql/queries";

interface IAppProps {
  currentUser?: IUserAuth | null;
}

function App(props: IAppProps) {
  const [setCurrentUser] = useMutation<
    { setCurrentUser: () => {} },
    { user: IUserAuth | null }
  >(SET_CURRENT_USER);
  const { data } = useQuery<{ currentUser: IUserAuth | null }>(
    GET_CURRENT_USER
  );
  const { currentUser } = data!;
  let unsubscripeFromAuth: Unsubscribe = () => {};
  useEffect(() => {
    unsubscripeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef!.onSnapshot((snapShot) => {
          setCurrentUser({
            variables: {
              user: {
                id: snapShot.id,
                ...(snapShot.data() as IUserAuth),
              },
            },
          });
        });
      } else {
        setCurrentUser({ variables: { user: userAuth } });
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

export default App;
