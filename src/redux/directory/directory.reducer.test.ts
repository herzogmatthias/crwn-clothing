import directoryReducer, { initialState } from "./directory.reducer";

describe("Directory Reducer", () => {
  test("return defaultState on undefined", () => {
    expect(directoryReducer(undefined, { type: null })).toEqual(initialState);
  });
});
