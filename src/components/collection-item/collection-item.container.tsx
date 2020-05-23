import React from "react";
import { IShopItem } from "../../redux/shop/IShopItem";
import { Mutation } from "react-apollo";
import { ADD_ITEM_TO_CART } from "../../graphql/mutations";
import CollectionItem from "./collection-item.component";

interface IContainerProps {
  item: IShopItem;
}

const CollectionItemContainer = (props: IContainerProps) => {
  return (
    <Mutation<{}, { item: IShopItem }> mutation={ADD_ITEM_TO_CART}>
      {(addItemToCart) => (
        <CollectionItem
          {...props}
          addItem={(item) => addItemToCart({ variables: { item } })}
        />
      )}
    </Mutation>
  );
};

export default CollectionItemContainer;
