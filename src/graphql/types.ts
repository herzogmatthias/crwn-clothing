import { ICartItem } from "../redux/cart/ICartItem";

export interface IHeaderType {
  cartHidden: boolean;
}

export interface ICacheState {
  cartHidden: boolean;
  cartItems: ICartItem[];
  itemCount: number;
}
