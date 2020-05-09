import * as React from "react";
import { IShopItem } from "../../pages/shop/IShopItem";
import "./collection-preview.styles.scss";
import CollectionItem from "../collection-item/collection-item.component";

export interface ICollectionPreviewProps {
  title: string;
  items: IShopItem[];
}

export function CollectionPreview({ title, items }: ICollectionPreviewProps) {
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items
          .filter((itm, index) => index < 4)
          .map((item) => {
            return <CollectionItem key={item.id} item={item}></CollectionItem>;
          })}
      </div>
    </div>
  );
}
