import { onfetchCollectionsStart, fetchCollectionAsync } from "./shop.sagas";
import { takeLatest, call, put } from "redux-saga/effects";
import { FETCH_COLLECTIONS_START } from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { ICategoryMap } from "./ICategoryMap";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

describe("Shop Saga: onFetchCollectionStart saga", () => {
  test("trigger on onfetchCollectionStart listener", () => {
    const generator = onfetchCollectionsStart();
    expect(generator.next().value).toEqual(
      takeLatest(FETCH_COLLECTIONS_START, fetchCollectionAsync)
    );
  });
});

describe("Shop Saga: fetchCollectionsAsync saga", () => {
  const generator = fetchCollectionAsync();
  test("call firestore collection", () => {
    const getCollection = jest.spyOn(firestore, "collection");
    generator.next();
    expect(getCollection).toHaveBeenCalled();
  });
  test("call convertCollectionsSnapshotToMap", () => {
    const mockSnapShot = null;
    expect(generator.next(mockSnapShot).value).toEqual(
      call(convertCollectionsSnapshotToMap, mockSnapShot)
    );
  });
  test("fire fetchCollectionsSuccess if collectionsMap is successful", () => {
    const mockCollection: ICategoryMap = {
      hats: {
        id: "asdfsadf",
        items: [],
        routeName: "/hats",
        title: "Hats",
      },
    };
    expect(generator.next(mockCollection).value).toEqual(
      put(fetchCollectionsSuccess(mockCollection))
    );
  });
  test("fire fetchCollectionsFailure if getCollections fails", () => {
    const newGenerator = fetchCollectionAsync();
    newGenerator.next();
    expect(newGenerator.throw({ message: "error" }).value).toEqual(
      put(fetchCollectionsFailure("error"))
    );
  });
});
