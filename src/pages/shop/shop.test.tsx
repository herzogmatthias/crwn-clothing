import React from "react";
import {
  createStore,
  combineReducers,
  AnyAction,
  Reducer,
  ReducersMapObject,
  Action,
} from "redux";
import {
  FETCH_COLLECTIONS_FAILURE,
  FETCH_COLLECTIONS_START,
} from "../../redux/shop/shop.types";
import {
  createAction,
  ActionCreatorWithoutPayload,
  createReducer,
} from "@reduxjs/toolkit";
import { mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ShopPage } from "./shop.component";

interface IMockStore {
  state: any;
  reducers: ReducersMapObject<any, any>;
}

export const createMockStore = ({ state, reducers }: IMockStore) => {
  const store = createStore(combineReducers(reducers), state);
  return {
    ...store,
    persistor: {
      persist: () => null,
    },
  };
};

describe("ShopPage", () => {
  let wrapper: ReactWrapper;
  let store: any;
  let mockAction: ActionCreatorWithoutPayload<"FETCH_COLLECTIONS_START">;
  beforeEach(() => {
    mockAction = jest.fn(createAction(FETCH_COLLECTIONS_START)) as any;
    const mockReducer = createReducer(
      { isFetching: false },
      {
        [mockAction.type]: (state, action) => {
          console.log(state);
          state.isFetching = true;
        },
      }
    );

    const mockState = {
      shop: {
        isFetching: false,
      },
    };

    store = createMockStore({
      state: mockState,
      reducers: { shop: mockReducer },
    });

    const mockMatch = {
      path: "",
      params: {},
      isExact: false,
      url: "",
    };

    const mockProps = {
      match: mockMatch,
      fetchCollectionsStart: mockAction,
    };
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ShopPage {...mockProps} />
        </Provider>
      </BrowserRouter>
    );
  });
  test("render ShopPage component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("call fetchCollectionsStart", () => {
    expect(mockAction).toHaveBeenCalled();
  });
});
