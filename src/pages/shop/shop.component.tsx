import * as React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route, RouteComponentProps } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";
import { connect, ConnectedProps } from "react-redux";

type IShopPageProps = ConnectedProps<typeof connector> & RouteComponentProps;

function ShopPage({ match, updateCollections }: IShopPageProps) {
  let unsubscripeFromSnapshot = null;
  React.useEffect(() => {
    const collectionRef = firestore.collection("collections");
    collectionRef.onSnapshot(async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
    });
    return () => {};
  }, []);

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

const mapDispatchToProps = {
  updateCollections: updateCollections,
};

const connector = connect(null, mapDispatchToProps);
export default connect(null, mapDispatchToProps)(ShopPage);
