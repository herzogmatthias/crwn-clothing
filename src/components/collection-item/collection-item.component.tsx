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

type ICollectionItemProps = ConnectedProps<typeof connector> & {
  item: IShopItem;
  className?: string;
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

const mapDispatchToProps = {
  addItem: addItem,
};
const connector = connect(null, mapDispatchToProps);
export default connect(null, mapDispatchToProps)(CollectionItem);
