import { IShopState } from "./IShopState";
import { createReducer } from "@reduxjs/toolkit";
import { SHOP_DATA } from "./shop.data";

const initialState: IShopState = {
  collections: SHOP_DATA,
};

const shopReducer = createReducer(initialState, {});
export default shopReducer;
