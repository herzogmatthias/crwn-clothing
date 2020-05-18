import { createAction } from "@reduxjs/toolkit";
import {
  TOGGLE_CART_HIDDEN,
  ADD_ITEM,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM,
  CLEAR_CART,
} from "./cart.types";
import { withPayloadType } from "../genericActionPayloadType";
import { IShopItem } from "../shop/IShopItem";
import { ICartItem } from "./ICartItem";

export const toggleCartHidden = createAction(TOGGLE_CART_HIDDEN);
export const addItem = createAction(ADD_ITEM, withPayloadType<IShopItem>());
export const clearItemFromCart = createAction(
  CLEAR_ITEM_FROM_CART,
  withPayloadType<ICartItem>()
);
export const removeItem = createAction(
  REMOVE_ITEM,
  withPayloadType<ICartItem>()
);

export const clearCart = createAction(CLEAR_CART);
