import cartReducer, { initialState } from "./cart.reducer";
import { ICartState } from "./ICartState";
import {
  toggleCartHidden,
  addItem,
  clearItemFromCart,
  removeItem,
  clearCart,
  getCartSuccess,
  getCartFailure,
  updateCartFailure,
} from "./cart.actions";
import { IShopItem } from "../shop/IShopItem";
import { ICartItem } from "./ICartItem";

describe("Cart Reducer", () => {
  let prevState: ICartState;
  const mockItem: IShopItem = {
    id: 1,
    imageUrl: "https://imgur.com/asdf",
    name: "snapback",
    price: 34,
  };
  beforeAll(() => {
    prevState = initialState;
  });
  test("return defaultState on undefined", () => {
    expect(cartReducer(undefined, { type: null })).toEqual(prevState);
  });

  test("set hidden to oposite of value on toggleCartHidden action", () => {
    expect(cartReducer(prevState, toggleCartHidden()).hidden).toEqual(
      !prevState.hidden
    );
  });
  test("add Item to cartItems on addItem action", () => {
    expect(cartReducer(prevState, addItem(mockItem)).cartItems.length).toEqual(
      1
    );
  });
  test("add 1 to quantity if item already exists on addItem action", () => {
    expect(
      cartReducer(
        { ...prevState, cartItems: [{ ...mockItem, quantity: 1 }] },
        addItem(mockItem)
      ).cartItems[0].quantity
    ).toEqual(2);
  });
  test("remove item from cartItems on clearItemFromCart action", () => {
    expect(
      cartReducer(
        { ...prevState, cartItems: [{ ...mockItem, quantity: 1 }] },
        clearItemFromCart({ ...mockItem, quantity: 1 })
      ).cartItems
    ).toEqual(prevState.cartItems);
  });
  test("remove Item from cartItems if quantity = 1 on removeItem action", () => {
    expect(
      cartReducer(
        { ...prevState, cartItems: [{ ...mockItem, quantity: 1 }] },
        removeItem({ ...mockItem, quantity: 1 })
      ).cartItems.length
    ).toEqual(0);
  });
  test("remove 1 from quantity if item already exists and quantity > 1 on removeItem action", () => {
    expect(
      cartReducer(
        { ...prevState, cartItems: [{ ...mockItem, quantity: 2 }] },
        removeItem({ ...mockItem, quantity: 2 })
      ).cartItems[0].quantity
    ).toEqual(1);
  });
  test("clear cartItems on clearCart action", () => {
    expect(
      cartReducer(
        { ...prevState, cartItems: [{ ...mockItem, quantity: 1 }] },
        clearCart()
      ).cartItems.length
    ).toEqual(0);
  });
  test("set cartItems from payload on getCartSuccess action", () => {
    const mockCart: ICartItem[] = [{ ...mockItem, quantity: 2 }];
    expect(cartReducer(prevState, getCartSuccess(mockCart)).cartItems).toEqual(
      mockCart
    );
  });
  test("set error from payload on getCartFailure or updateCartFailure action", () => {
    const mockError = "I am an Error";
    expect(cartReducer(prevState, getCartFailure(mockError)).error).toEqual(
      mockError
    );
    expect(cartReducer(prevState, updateCartFailure(mockError)).error).toEqual(
      mockError
    );
  });
});
