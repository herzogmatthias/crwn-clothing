import { IShopItem } from "../../pages/shop/IShopItem";
import { ICartItem } from "./ICartItem";

export const addItemToCart = (
  cartItems: ICartItem[],
  cartItemToAdd: IShopItem
) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }] as ICartItem[];
};
