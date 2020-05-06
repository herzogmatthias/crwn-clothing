import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch } from "react-router-dom";
import { ShopPage } from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import { SignInAndSignUp } from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth } from "./firebase/firebase.utils";
import { User, Unsubscribe } from "firebase";

function App() {
  const [currentUser, setUser] = React.useState<User | null>(null);
  let unsubscripeFromAuth: Unsubscribe;
  useEffect(() => {
    unsubscripeFromAuth = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
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
