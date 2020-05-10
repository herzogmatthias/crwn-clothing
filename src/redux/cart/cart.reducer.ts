import { ICartState } from "./ICartState";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  toggleCartHidden,
  addItem,
  clearItemFromCart,
  removeItem,
} from "./cart.actions";
import { IShopItem } from "../shop/IShopItem";
import { addItemToCart, removeItemFromCart } from "./cart.utils";
import { ICartItem } from "./ICartItem";

const initialState: ICartState = {
  hidden: true,
  cartItems: [],
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
});

export default cartReducer;
