import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import CollectionPageContainer from "../collection/collection.container";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { connect, ConnectedProps } from "react-redux";
import CollectionsOverviewContainer from "../../components/collections-overview/collections.overview.container";

type IShopPageProps = ConnectedProps<typeof connector> & RouteComponentProps;

function ShopPage({ fetchCollectionsStart, match }: IShopPageProps) {
  React.useEffect(() => {
    fetchCollectionsStart();
  }, []);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      ></Route>
      <Route
        path={`${match.path}/:categoryId`}
        component={CollectionPageContainer}
      ></Route>
    </div>
  );
}

const mapDispatchToProps = {
  fetchCollectionsStart: fetchCollectionsStart,
};

const connector = connect(null, mapDispatchToProps);
export default connect(null, mapDispatchToProps)(ShopPage);
