import { RootState } from "../root-reducer";
import { createSelector } from "reselect";

const selectShop = (state: RootState) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectShopCollections],
  (collections) =>
    collections
      ? Object.keys(collections).map((key: string) => collections[key])
      : []
);

export const selectCollection = (collectionUrlParam: string) =>
  createSelector([selectShopCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );
