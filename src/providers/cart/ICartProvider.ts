import { ICartItem } from "./ICartItem";
import { IShopItem } from "./IShopItem";

export interface ICartProvider {
  hidden: boolean;
  total: number;
  toggleHidden(): void;
  cartItems: ICartItem[];
  addItem(item: IShopItem): void;
  removeItem(item: ICartItem): void;
  clearItemFromCart(item: ICartItem): void;
  cartItemsCount: number;
}
