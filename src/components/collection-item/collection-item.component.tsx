import * as React from "react";
import { IShopItem } from "../../redux/shop/IShopItem";
import {
  ImageContainer,
  CollectionItemContainer,
  CollectionFooterContainer,
  NameContainer,
  PriceContainer,
  CustomButtonContainer,
} from "./collection-item.styles";

type ICollectionItemProps = {
  item: IShopItem;
  className?: string;
  addItem(item: IShopItem): void;
};

function CollectionItem({ item, addItem, className }: ICollectionItemProps) {
  return (
    <CollectionItemContainer className={className}>
      <ImageContainer imageUrl={item.imageUrl}></ImageContainer>
      <CollectionFooterContainer>
        <NameContainer>{item.name}</NameContainer>
        <PriceContainer>${item.price}</PriceContainer>
      </CollectionFooterContainer>
      <CustomButtonContainer onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButtonContainer>
    </CollectionItemContainer>
  );
}

export default CollectionItem;
