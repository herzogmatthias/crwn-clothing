import { createAction } from "@reduxjs/toolkit";
import {
  TOGGLE_CART_HIDDEN,
  ADD_ITEM,
  CLEAR_ITEM_FROM_CART,
  REMOVE_ITEM,
  CLEAR_CART,
  GET_CART_FAILURE,
  GET_CART_START,
  GET_CART_SUCCESS,
  UPDATE_CART_FAILURE,
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

export const getCartStart = createAction(
  GET_CART_START,
  withPayloadType<string>()
);
export const getCartSuccess = createAction(
  GET_CART_SUCCESS,
  withPayloadType<ICartItem[]>()
);
export const getCartFailure = createAction(
  GET_CART_FAILURE,
  withPayloadType<string>()
);

export const updateCartFailure = createAction(
  UPDATE_CART_FAILURE,
  withPayloadType<string>()
);

export const clearCart = createAction(CLEAR_CART);
