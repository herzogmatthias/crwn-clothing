import { ICartState } from "./ICartState";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  toggleCartHidden,
  addItem,
  clearItemFromCart,
  removeItem,
  clearCart,
  getCartFailure,
  getCartSuccess,
  updateCartFailure,
} from "./cart.actions";
import { IShopItem } from "../shop/IShopItem";
import { addItemToCart, removeItemFromCart } from "./cart.utils";
import { ICartItem } from "./ICartItem";

export const initialState: ICartState = {
  hidden: true,
  cartItems: [],
  error: "",
};

const cartReducer = createReducer(initialState, {
  [toggleCartHidden.type]: (state, action) => {
    state.hidden = !state.hidden;
  },
  [addItem.type]: (state, action: PayloadAction<IShopItem>) => {
    state.cartItems = addItemToCart(state.cartItems, action.payload);
  },
  [clearItemFromCart.type]: (state, action: PayloadAction<ICartItem>) => {
    state.cartItems = state.cartItems.filter(
      (cartItem) => cartItem.id !== action.payload.id
    );
  },
  [removeItem.type]: (state, action: PayloadAction<ICartItem>) => {
    state.cartItems = removeItemFromCart(state.cartItems, action.payload);
  },
  [clearCart.type]: (state, action) => {
    state.cartItems = [];
  },
  [getCartSuccess.type]: (state, action: PayloadAction<ICartItem[]>) => {
    state.cartItems = action.payload;
    state.error = "";
  },
  [getCartFailure.type]: (state, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
  [updateCartFailure.type]: (state, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
});

export default cartReducer;
