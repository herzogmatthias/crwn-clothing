import * as React from "react";
import {
  TitleContainer,
  CollectionPageContainer,
  ItemsContainer,
  CollectionItemContainer,
} from "./collection.styles";
import { ICategory } from "../../redux/shop/ICategory";

interface ICollectionPageProps {
  collection: ICategory;
}

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

export default CollectionPage;
