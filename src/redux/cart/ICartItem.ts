import { IShopItem } from "../shop/IShopItem";

export interface ICartItem extends IShopItem {
  quantity: number;
}
