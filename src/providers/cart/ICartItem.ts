import { IShopItem } from "./IShopItem";

export interface ICartItem extends IShopItem {
  quantity: number;
}
