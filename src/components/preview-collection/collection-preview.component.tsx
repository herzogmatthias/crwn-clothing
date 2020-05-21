import * as React from "react";
import { IShopItem } from "../../providers/cart/IShopItem";
import CollectionItem from "../collection-item/collection-item.component";
import {
  TitleContainer,
  CollectionPreviewContainer,
  PreviewContainer,
} from "./collection-preview.styles";

export interface ICollectionPreviewProps {
  title: string;
  items: IShopItem[];
}

export function CollectionPreview({ title, items }: ICollectionPreviewProps) {
  return (
    <CollectionPreviewContainer>
      <TitleContainer>{title.toUpperCase()}</TitleContainer>
      <PreviewContainer>
        {items
          .filter((itm, index) => index < 4)
          .map((item) => {
            return <CollectionItem key={item.id} item={item}></CollectionItem>;
          })}
      </PreviewContainer>
    </CollectionPreviewContainer>
  );
}
