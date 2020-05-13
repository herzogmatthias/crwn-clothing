import { IShopState } from "./IShopState";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { SHOP_DATA } from "./shop.data";
import { updateCollections } from "./shop.actions";
import { ICategoryMap } from "./ICategoryMap";

const initialState: IShopState = {
  collections: SHOP_DATA,
};

const shopReducer = createReducer(initialState, {
  [updateCollections.type]: (state, action: PayloadAction<ICategoryMap>) => {
    state.collections = action.payload;
  },
});
export default shopReducer;
