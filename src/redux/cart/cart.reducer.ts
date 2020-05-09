import { ICartState } from "./ICartState";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { toggleCartHidden, addItem } from "./cart.actions";
import { IShopItem } from "../../pages/shop/IShopItem";
import { addItemToCart } from "./cart.utils";

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
});

export default cartReducer;
