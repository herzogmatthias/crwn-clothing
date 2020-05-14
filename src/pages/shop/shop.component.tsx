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
import WithSpinner from "../../components/with-spinner/with-spinner.component";

type IShopPageProps = ConnectedProps<typeof connector> & RouteComponentProps;

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

function ShopPage({ match, updateCollections }: IShopPageProps) {
  let unsubscripeFromSnapshot: Function | null = null;
  const [isLoading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const collectionRef = firestore.collection("collections");
    unsubscripeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      setLoading(false);
    });
    return () => {
      console.log(unsubscripeFromSnapshot);
    };
  }, []);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionsOverviewWithSpinner isLoading={isLoading} />
        )}
      ></Route>
      <Route
        path={`${match.path}/:categoryId`}
        render={(props) => (
          <CollectionPageWithSpinner {...props} isLoading={isLoading} />
        )}
      ></Route>
    </div>
  );
}

const mapDispatchToProps = {
  updateCollections: updateCollections,
};

const connector = connect(null, mapDispatchToProps);
export default connect(null, mapDispatchToProps)(ShopPage);
