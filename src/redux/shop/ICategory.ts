import { IShopItem } from "./IShopItem";

export interface ICategory {
  id: string | number;
  title: string;
  routeName: string;
  items: IShopItem[];
}
