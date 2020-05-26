import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/root-reducer";
import { selectCollection } from "../../redux/shop/shop.selectors";
import {
  TitleContainer,
  CollectionPageContainer,
  ItemsContainer,
  CollectionItemContainer,
} from "./collection.styles";

type ICollectionPageProps = ConnectedProps<typeof connector> &
  RouteComponentProps<{ categoryId: string }>;

function CollectionPage({ collection }: ICollectionPageProps) {
  const { title, items } = collection;
  return (
    <CollectionPageContainer>
      <TitleContainer>{title}</TitleContainer>
      <ItemsContainer>
        {items.map((item) => (
          <CollectionItemContainer
            key={item.id}
            item={item}
          ></CollectionItemContainer>
        ))}
      </ItemsContainer>
    </CollectionPageContainer>
  );
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<{ categoryId: string }>
) => ({
  collection: selectCollection(ownProps.match.params.categoryId)(state)!,
});

const connector = connect(mapStateToProps, {});
export default connect(mapStateToProps, {})(CollectionPage);
