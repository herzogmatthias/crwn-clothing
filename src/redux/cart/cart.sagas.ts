import { all, takeLatest, put, call, select } from "redux-saga/effects";
import { SIGN_OUT_SUCCESS } from "../user/user.types";
import {
  clearCart,
  getCartStart,
  getCartFailure,
  getCartSuccess,
  updateCartFailure,
} from "./cart.actions";
import {
  GET_CART_START,
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_ITEM_FROM_CART,
} from "./cart.types";
import { getOrCreateDocumentCartForUser } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../user/user.selectors";
import { selectCartItems } from "./cart.selectors";

type GetCartStart = ReturnType<typeof getCartStart>;

export function* onSignOutSuccess() {
  yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onGetCartStart() {
  yield takeLatest(GET_CART_START, getUserCart);
}
export function* onUpdateCart() {
  yield takeLatest([ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM_FROM_CART], updateCart);
}

export function* updateCart() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const cartRef = yield call(
        getOrCreateDocumentCartForUser,
        currentUser.id
      );
      const cartItems = yield select(selectCartItems);
      yield cartRef.update({ items: cartItems });
    } catch (error) {
      yield put(updateCartFailure(error.message));
    }
  }
}

export function* getUserCart({ payload }: GetCartStart) {
  try {
    const cartRef = yield call(getOrCreateDocumentCartForUser, payload);
    const snapshot = yield cartRef.get();
    yield put(getCartSuccess(snapshot.data().items));
  } catch (error) {
    yield put(getCartFailure(error.message));
  }
}

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(onGetCartStart), call(onUpdateCart)]);
}
