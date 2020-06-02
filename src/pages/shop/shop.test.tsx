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
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { mount, ReactWrapper } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ShopPage } from "./shop.component";

describe("CONNECTED SHOPPAGE TESTS", () => {
  let wrapper: ReactWrapper;
  let mockStore = configureStore([]);
  let store: MockStoreEnhanced<unknown, {}>;
  let mockAction: ActionCreatorWithoutPayload<"FETCH_COLLECTIONS_START">;
  beforeEach(() => {
    const mockState = {
      shop: {
        isFetching: false,
      },
    };

    store = mockStore(mockState);
    mockAction = jest.fn(() => {
      store.dispatch({ type: FETCH_COLLECTIONS_START, payload: undefined });
    }) as any;

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
