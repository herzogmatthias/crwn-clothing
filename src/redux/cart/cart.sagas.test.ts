import {
  onSignOutSuccess,
  clearCartOnSignOut,
  onGetCartStart,
  getUserCart,
  onUpdateCart,
  updateCart,
} from "./cart.sagas";
import { takeLatest, put, call, select } from "redux-saga/effects";
import { SIGN_OUT_SUCCESS } from "../user/user.types";
import {
  GET_CART_START,
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_ITEM_FROM_CART,
} from "./cart.types";
import {
  clearCart,
  getCartStart,
  getCartSuccess,
  getCartFailure,
  updateCartFailure,
} from "./cart.actions";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { getOrCreateDocumentCartForUser } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../user/user.selectors";
import { selectCartItems } from "./cart.selectors";

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

describe("get cart items on get cart start saga", () => {
  const uid = "asdf123";
  const cartRef = {
    data: null,
    get: () => {
      return true;
    },
  };
  const mockSnapshot = {
    data: () => {
      return { items: [] };
    },
  };
  const mockAction = getCartStart(uid);
  const generator = cloneableGenerator(getUserCart)(mockAction);
  test("call getOrCreateDocumentCartForUser", () => {
    expect(generator.next().value).toEqual(
      call(getOrCreateDocumentCartForUser, uid)
    );
  });
  test("call cartRef.get()", () => {
    expect(generator.next(cartRef).value).toEqual(cartRef.get());
  });
  test("trigger getCartSuccess action", () => {
    expect(generator.next(mockSnapshot).value).toEqual(
      put(getCartSuccess(mockSnapshot.data().items))
    );
  });
  test("trigger getCartFailure on Error", () => {
    const newGen = generator.clone();
    expect(newGen.throw!({ message: "error" }).value).toEqual(
      put(getCartFailure("error"))
    );
  });
});

describe("update cart items on update cart saga", () => {
  const generator = cloneableGenerator(updateCart)();
  const currentUser = { id: "asdf1234" };
  const cartItems = [{ id: "asdf" }];
  const cartRef = {
    update: (args: { items: any[]; options?: any }) => {
      const { items } = args;
      return items;
    },
  };
  test("get current user", () => {
    expect(generator.next().value).toEqual(select(selectCurrentUser));
  });
  test("get cartRef of current user", () => {
    expect(generator.next(currentUser).value).toEqual(
      call(getOrCreateDocumentCartForUser, currentUser.id)
    );
  });
  test("get the current CartItems", () => {
    expect(generator.next().value).toEqual(select(selectCartItems));
  });
  /*
  test("update CartItems", () => {
    const newGen = updateCart();
    newGen.next();
    newGen.next();
    newGen.next();
    expect(newGen.next(cartRef).value).toEqual(
      cartRef.update({ items: cartItems })
    );
  });
  */
  test("trigger updateCartFailure when throwing error", () => {
    expect(generator.throw!({ message: "error" }).value).toEqual(
      put(updateCartFailure("error"))
    );
  });
});
