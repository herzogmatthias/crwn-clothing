import { ICartItem } from "./ICartItem";
import { ISection } from "./ISection";
import { IUserAuth } from "../IUserAuth";

export interface IHeaderType {
  cartHidden: boolean;
}

export interface ICacheState {
  cartHidden: boolean;
  cartItems: ICartItem[];
  itemCount: number;
  total: number;
  sections: ISectionGraphql[];
  currentUser: null | IUserAuth;
}

export interface ISectionGraphql extends ISection {
  __typename: string;
}
