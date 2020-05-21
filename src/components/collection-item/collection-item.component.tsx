import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import { IShopItem } from "../../redux/shop/IShopItem";
import {
  ImageContainer,
  CollectionItemContainer,
  CollectionFooterContainer,
  NameContainer,
  PriceContainer,
  CustomButtonContainer,
} from "./collection-item.styles";
import { CartContext } from "../../providers/cart/cart.provider";

interface ICollectionItemProps {
  item: IShopItem;
  className?: string;
}

function CollectionItem({ item, className }: ICollectionItemProps) {
  const { addItem } = React.useContext(CartContext);
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
