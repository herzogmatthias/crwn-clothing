import { ICategoryMap } from "./ICategoryMap";

export interface IShopState {
  collections: ICategoryMap | null;
  isFetching: boolean;
  errorMessage: string;
}
