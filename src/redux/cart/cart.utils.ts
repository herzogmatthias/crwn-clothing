import { IShopItem } from "../shop/IShopItem";
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

export const removeItemFromCart = (
  cartItems: ICartItem[],
  cartItemToRemove: ICartItem
) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const filterItemFromCart = (cartItems: ICartItem[], item: ICartItem) =>
  cartItems.filter((cartItem) => cartItem.id !== item.id);

export const getCartItemsCount = (cartItems: ICartItem[]) =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
    0
  );

export const getTotalPrice = (cartItems: ICartItem[]) =>
  cartItems.reduce(
    (totalCost, cartItem) => totalCost + cartItem.quantity * cartItem.price,
    0
  );
