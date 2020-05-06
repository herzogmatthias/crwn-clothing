import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch } from "react-router-dom";
import { ShopPage } from "./pages/shop/shop.component";
import Header from "./components/header/header.component";

function App() {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route path="/shop/:section" component={ShopPage}></Route>
        <Route exact path="/" component={HomePage}></Route>
      </Switch>
    </div>
  );
}

export default App;
