import {
  onSignOutSuccess,
  clearCartOnSignOut,
  onGetCartStart,
  getUserCart,
  onUpdateCart,
  updateCart,
} from "./cart.sagas";
import { takeLatest, put } from "redux-saga/effects";
import { SIGN_OUT_SUCCESS } from "../user/user.types";
import {
  GET_CART_START,
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_ITEM_FROM_CART,
} from "./cart.types";
import { clearCart } from "./cart.actions";

describe("cart sagas: triggers", () => {
  test("trigger onSignOut saga", () => {
    const generator = onSignOutSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut)
    );
  });
  test("trigger onGetCartStart saga", () => {
    const generator = onGetCartStart();
    expect(generator.next().value).toEqual(
      takeLatest(GET_CART_START, getUserCart)
    );
  });
  test("trigger onUpdateCart saga", () => {
    const generator = onUpdateCart();
    expect(generator.next().value).toEqual(
      takeLatest([ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM_FROM_CART], updateCart)
    );
  });
});
describe("clear cart on signout saga", () => {
  test("fire clearCart", () => {
    const generator = clearCartOnSignOut();
    expect(generator.next().value).toEqual(put(clearCart()));
  });
});
