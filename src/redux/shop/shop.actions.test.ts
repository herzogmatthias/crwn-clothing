import {
  fetchCollectionsStart,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";
import {
  FETCH_COLLECTIONS_START,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE,
} from "./shop.types";
import { ICategoryMap } from "./ICategoryMap";

describe("Shop Actions", () => {
  test("create fetchCollectionsStart action", () => {
    expect(fetchCollectionsStart().type).toEqual(FETCH_COLLECTIONS_START);
  });
  test("create fetchCollectionsSuccess action", () => {
    const mockCollection: ICategoryMap = {
      hats: {
        id: "asdfsadf",
        items: [],
        routeName: "/hats",
        title: "Hats",
      },
    };
    const action = fetchCollectionsSuccess(mockCollection);
    expect(action.type).toEqual(FETCH_COLLECTIONS_SUCCESS);
    expect(action.payload).toEqual(mockCollection);
  });
  test("create fetchCollectionsFailure action", () => {
    const error = "I am an Error";
    const action = fetchCollectionsFailure(error);
    expect(action.type).toEqual(FETCH_COLLECTIONS_FAILURE);
    expect(action.payload).toEqual(error);
  });
});
