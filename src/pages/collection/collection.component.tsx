import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  TitleContainer,
  CollectionPageContainer,
  ItemsContainer,
  CollectionItemContainer,
} from "./collection.styles";
import CollectionsContext from "../../contexts/collections/collections.context";

type ICollectionPageProps = RouteComponentProps<{ categoryId: string }>;

function CollectionPage({ match }: ICollectionPageProps) {
  const collections = React.useContext(CollectionsContext);
  const collection = collections[match.params.categoryId];
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

export default CollectionPage;
