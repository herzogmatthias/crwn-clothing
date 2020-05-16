import { IShopState } from "./IShopState";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryMap } from "./ICategoryMap";
import {
  fetchCollectionsStart,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

const initialState: IShopState = {
  collections: null,
  isFetching: false,
  errorMessage: "",
};

const shopReducer = createReducer(initialState, {
  [fetchCollectionsStart.type]: (state, action) => {
    state.isFetching = true;
  },
  [fetchCollectionsSuccess.type]: (
    state,
    action: PayloadAction<ICategoryMap>
  ) => {
    state.isFetching = false;
    state.collections = action.payload;
  },
  [fetchCollectionsFailure.type]: (state, action: PayloadAction<string>) => {
    state.isFetching = false;
    state.errorMessage = action.payload;
  },
});
export default shopReducer;
