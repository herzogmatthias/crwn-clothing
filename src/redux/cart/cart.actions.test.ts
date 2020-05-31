import {
  toggleCartHidden,
  addItem,
  removeItem,
  clearItemFromCart,
  clearCart,
} from "./cart.actions";
import {
  TOGGLE_CART_HIDDEN,
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_ITEM_FROM_CART,
  CLEAR_CART,
} from "./cart.types";
import { IShopItem } from "../shop/IShopItem";
import { ICartItem } from "./ICartItem";

describe("Cart Actions", () => {
  test("create the toggleHidden action", () => {
    expect(toggleCartHidden().type).toEqual(TOGGLE_CART_HIDDEN);
  });
  test("create the addItem action", () => {
    const mockItem: IShopItem = {
      id: 1,
      imageUrl: "asdfasd",
      name: "Hat",
      price: 34,
    };

    const action = addItem(mockItem);

    expect(action.type).toEqual(ADD_ITEM);
    expect(action.payload).toEqual(mockItem);
  });
  test("create the removeItem action", () => {
    const mockItem: ICartItem = {
      id: 1,
      imageUrl: "asdf",
      name: "hat",
      price: 23,
      quantity: 1,
    };

    const action = removeItem(mockItem);

    expect(action.type).toEqual(REMOVE_ITEM);
    expect(action.payload).toEqual(mockItem);
  });
  test("create the clearItemFromCart action", () => {
    const mockItem: ICartItem = {
      id: 1,
      imageUrl: "asdf",
      name: "hat",
      price: 23,
      quantity: 1,
    };

    const action = clearItemFromCart(mockItem);

    expect(action.type).toEqual(CLEAR_ITEM_FROM_CART);
    expect(action.payload).toEqual(mockItem);
  });
  test("create the clearCart action", () => {
    expect(clearCart().type).toEqual(CLEAR_CART);
  });
});
