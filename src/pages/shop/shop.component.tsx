import * as React from "react";
import { ICategory } from "./ICategory";
import { SHOP_DATA } from "./shop.data";
import { CollectionPreview } from "../../components/preview-collection/collection-preview.component";

export interface IShopPageProps {}

export function ShopPage(props: IShopPageProps) {
  const [collections] = React.useState<ICategory[]>(SHOP_DATA);
  return (
    <div className="shop-page">
      {collections.map(({ id, ...otherCollectionProps }: ICategory) => {
        return (
          <CollectionPreview
            key={id}
            {...otherCollectionProps}
          ></CollectionPreview>
        );
      })}
    </div>
  );
}
