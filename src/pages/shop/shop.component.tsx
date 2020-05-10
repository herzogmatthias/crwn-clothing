import * as React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route, RouteComponentProps } from "react-router-dom";
import CollectionPage from "../collection/collection.component";

interface IShopPageProps extends RouteComponentProps {}

function ShopPage({ match }: IShopPageProps) {
  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverview}
      ></Route>
      <Route
        path={`${match.path}/:categoryId`}
        component={CollectionPage}
      ></Route>
    </div>
  );
}

export default ShopPage;
