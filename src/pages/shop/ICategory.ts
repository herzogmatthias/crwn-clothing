import { IShopItem } from "./IShopItem";

export interface ICategory {
  id: number;
  title: string;
  routeName: string;
  items: IShopItem[];
}
