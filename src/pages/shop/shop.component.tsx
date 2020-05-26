import React, { lazy, Suspense } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { connect, ConnectedProps } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";

const CollectionsOverview = lazy(() =>
  import("../../components/collections-overview/collections.overview.container")
);
const CollectionPage = lazy(() => import("../collection/collection.container"));

type IShopPageProps = ConnectedProps<typeof connector> & RouteComponentProps;

function ShopPage({ fetchCollectionsStart, match }: IShopPageProps) {
  React.useEffect(() => {
    fetchCollectionsStart();
  }, []);

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner></Spinner>}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverview}
        ></Route>
        <Route
          path={`${match.path}/:categoryId`}
          component={CollectionPage}
        ></Route>
      </Suspense>
    </div>
  );
}

const mapDispatchToProps = {
  fetchCollectionsStart: fetchCollectionsStart,
};

const connector = connect(null, mapDispatchToProps);
export default connect(null, mapDispatchToProps)(ShopPage);
