import { ICartItem } from "./ICartItem";

export interface ICartState {
  hidden: boolean;
  cartItems: ICartItem[];
  error: string;
}
