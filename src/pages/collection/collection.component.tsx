import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./collection.styles.scss";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/root-reducer";
import {
  selectCollection,
  COLLECTION_ID_MAP,
} from "../../redux/shop/shop.selectors";

type ICollectionPageProps = ConnectedProps<typeof connector> &
  RouteComponentProps<{ categoryId: keyof typeof COLLECTION_ID_MAP }>;

function CollectionPage({ match, collection }: ICollectionPageProps) {
  console.log(collection);
  return (
    <div className="category">
      <h2>CATEGORY PAGE</h2>
    </div>
  );
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<{ categoryId: keyof typeof COLLECTION_ID_MAP }>
) => ({
  collection: selectCollection(ownProps.match.params.categoryId)(state),
});

const connector = connect(mapStateToProps, {});
export default connect(mapStateToProps, {})(CollectionPage);
