import * as React from "react";

import "./collection-item.styles.scss";
import { CustomButton } from "../custom-button/custom-button.component";
import { connect, ConnectedProps } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import { IShopItem } from "../../redux/shop/IShopItem";

type ICollectionItemProps = ConnectedProps<typeof connector> & {
  item: IShopItem;
};

function CollectionItem({ item, addItem }: ICollectionItemProps) {
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      ></div>
      <div className="collection-footer">
        <span className="name">{item.name}</span>
        <span className="price">{item.price}</span>
      </div>
      <CustomButton onClick={() => addItem(item)} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
}

const mapDispatchToProps = {
  addItem: addItem,
};
const connector = connect(null, mapDispatchToProps);
export default connect(null, mapDispatchToProps)(CollectionItem);
