import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch } from "react-router-dom";
import { ShopPage } from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import { SignInAndSignUp } from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { User, Unsubscribe } from "firebase";
import { IUserAuth } from "./IUserAuth";

function App() {
  const [currentUser, setUser] = React.useState<IUserAuth | null>(null);
  let unsubscripeFromAuth: Unsubscribe;
  useEffect(() => {
    unsubscripeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef!.onSnapshot((snapShot) => {
          setUser({ id: snapShot.id, ...(snapShot.data() as IUserAuth) });
        });
      } else {
        setUser(null);
      }
    });
    return function cleanup() {
      unsubscripeFromAuth();
    };
  }, []);
  return (
    <div>
      <Header currentUser={currentUser}></Header>
      <Switch>
        <Route path="/shop/:section" component={ShopPage}></Route>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/signIn" component={SignInAndSignUp}></Route>
      </Switch>
    </div>
  );
}

export default App;
