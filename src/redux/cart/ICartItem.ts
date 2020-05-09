import { IShopItem } from "../../pages/shop/IShopItem";

export interface ICartItem extends IShopItem {
  quantity: number;
}
