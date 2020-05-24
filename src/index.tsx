import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-boost";
import { CachePersistor } from "apollo-cache-persist";
import { typeDefs, resolvers } from "./graphql/resolvers";
import { ICacheState } from "./graphql/types";
import { INITIAL_STATE } from "./graphql/init-data";

const httpLink = createHttpLink({ uri: "https://crwn-clothing.com" });
const init = async () => {
  const cache = new InMemoryCache();
  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage as any,
  });
  const client = new ApolloClient({
    link: httpLink,
    cache,
    typeDefs,
    resolvers,
  });

  client.writeData<ICacheState>({
    data: INITIAL_STATE,
  });
  persistor.restore();

  ReactDOM.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("root")
  );
};
init();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
