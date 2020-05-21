import { ICartItem } from "../../redux/cart/ICartItem";
import { IShopItem } from "../../redux/shop/IShopItem";

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
