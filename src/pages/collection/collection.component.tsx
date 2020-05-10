import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import "./collection.styles.scss";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/root-reducer";
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";

type ICollectionPageProps = ConnectedProps<typeof connector> &
  RouteComponentProps<{ categoryId: string }>;

function CollectionPage({ collection }: ICollectionPageProps) {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item}></CollectionItem>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<{ categoryId: string }>
) => ({
  collection: selectCollection(ownProps.match.params.categoryId)(state),
});

const connector = connect(mapStateToProps, {});
export default connect(mapStateToProps, {})(CollectionPage);
