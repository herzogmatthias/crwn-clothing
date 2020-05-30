import { IShopState } from "./IShopState";
import shopReducer, { initialState } from "./shop.reducer";
import {
  fetchCollectionsStart,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";
import { ICategoryMap } from "./ICategoryMap";
describe("Shop Reducer", () => {
  let prevState: IShopState;
  beforeAll(() => {
    prevState = initialState;
  });
  test("return defaultState on undefined", () => {
    expect(shopReducer(undefined, { type: null })).toEqual(prevState);
  });
  test("set isFetching to true in fetchCollectionStart action", () => {
    expect(shopReducer(prevState, fetchCollectionsStart()).isFetching).toEqual(
      true
    );
  });
  test("set Collection to payload in fetchCollectionsSuccess action", () => {
    const mockCollections: ICategoryMap = {
      hats: {
        id: "asdfasdf1",
        items: [],
        routeName: "/hats",
        title: "Hats",
      },
    };
    expect(
      shopReducer(prevState, fetchCollectionsSuccess(mockCollections))
        .collections
    ).toEqual(mockCollections);
  });
  test("set error to payload in fetchCollectionsFailure action", () => {
    const mockError = "I am an Error";
    expect(
      shopReducer(prevState, fetchCollectionsFailure(mockError)).errorMessage
    ).toEqual(mockError);
  });
});
