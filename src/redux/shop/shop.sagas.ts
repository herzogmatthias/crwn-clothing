import { call, put, takeLatest, all } from "redux-saga/effects";
import { FETCH_COLLECTIONS_START } from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

export function* fetchCollectionAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* onfetchCollectionsStart() {
  console.log("start fetching");
  yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionAsync);
}

export function* shopSagas() {
  yield all([call(onfetchCollectionsStart)]);
}
