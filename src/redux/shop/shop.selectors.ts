import { RootState } from "../root-reducer";
import { createSelector } from "reselect";

export enum COLLECTION_ID_MAP {
  hats = 1,
  sneakers,
  jackets,
  womens,
  mens,
}

const selectShop = (state: RootState) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollection = (
  collectionUrlParam: keyof typeof COLLECTION_ID_MAP
) =>
  createSelector([selectShopCollections], (collections) =>
    collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
  );
