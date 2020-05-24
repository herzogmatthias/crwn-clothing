import * as React from "react";
import { default as CollectionsOverview } from "../../components/collections-overview/collections-overview.container";
import { Route, RouteComponentProps } from "react-router-dom";
import { default as CollectionPage } from "../collection/collection.component";

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
