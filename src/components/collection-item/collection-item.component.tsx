import * as React from "react";
import { IShopItem } from "../../graphql/IShopItem";
import {
  ImageContainer,
  CollectionItemContainer,
  CollectionFooterContainer,
  NameContainer,
  PriceContainer,
  CustomButtonContainer,
} from "./collection-item.styles";
import { useMutation } from "react-apollo";
import { ADD_ITEM_TO_CART } from "../../graphql/mutations";

type ICollectionItemProps = {
  item: IShopItem;
  className?: string;
  addItem?(item: IShopItem): void;
};

function CollectionItem({ item, className }: ICollectionItemProps) {
  const [addItem] = useMutation<
    { additem(item: IShopItem): void },
    { item: IShopItem }
  >(ADD_ITEM_TO_CART);
  return (
    <CollectionItemContainer className={className}>
      <ImageContainer imageUrl={item.imageUrl}></ImageContainer>
      <CollectionFooterContainer>
        <NameContainer>{item.name}</NameContainer>
        <PriceContainer>${item.price}</PriceContainer>
      </CollectionFooterContainer>
      <CustomButtonContainer
        onClick={() => addItem({ variables: { item } })}
        inverted
      >
        Add to cart
      </CustomButtonContainer>
    </CollectionItemContainer>
  );
}

export default CollectionItem;
