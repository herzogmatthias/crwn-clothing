import { createAction, Dispatch } from "@reduxjs/toolkit";
import {
  FETCH_COLLECTIONS_START,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE,
} from "./shop.types";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.utils";
import { withPayloadType } from "../genericActionPayloadType";
import { ICategoryMap } from "./ICategoryMap";

export const fetchCollectionsStart = createAction(FETCH_COLLECTIONS_START);
export const fetchCollectionsSuccess = createAction(
  FETCH_COLLECTIONS_SUCCESS,
  withPayloadType<ICategoryMap>()
);
export const fetchCollectionsFailure = createAction(
  FETCH_COLLECTIONS_FAILURE,
  withPayloadType<string>()
);
/**
 *  Dispatch async redux with redux-thunk
 *
 * @returns (dispatch: Dispatch) => void
 **/
/*
const fetchCollectionStartAsync = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchCollectionsStart());
    const collectionRef = firestore.collection("collections");

    collectionRef
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((err) => {
        dispatch(fetchCollectionsFailure(err.message));
      });
  };
};
*/
