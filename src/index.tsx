import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-boost";
import { typeDefs, resolvers } from "./graphql/resolvers";
import { ICacheState } from "./graphql/types";

const httpLink = createHttpLink({ uri: "https://crwn-clothing.com" });

const cache = new InMemoryCache();
const client = new ApolloClient({ link: httpLink, cache, typeDefs, resolvers });

client.writeData<ICacheState>({
  data: {
    cartHidden: true,
    cartItems: [],
    itemCount: 0,
  },
});
console.log("Index new");
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
