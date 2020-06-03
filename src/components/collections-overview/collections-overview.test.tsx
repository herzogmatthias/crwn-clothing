import React from "react";
import { ReactWrapper, mount } from "enzyme";
import { ICategoryMap } from "../../redux/shop/ICategoryMap";
import {
  default as ConnectedCollectionsOverview,
  CollectionsOverview,
} from "./collections-overview.component";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

describe("CONNECTED COLLECTIONS-OVERVIEW TESTS", () => {
  let wrapper: ReactWrapper;
  let mockStore = configureStore([]);
  let store: MockStoreEnhanced<unknown, {}>;
  const colllectionsMap: ICategoryMap = {
    hats: {
      id: "asdfsa33",
      items: [],
      routeName: "/hats",
      title: "Hats",
    },
    Mens: {
      id: "asdfsa34",
      items: [],
      routeName: "/mens",
      title: "Mens",
    },
  };
  beforeEach(() => {
    const mockState = {
      shop: {
        collections: colllectionsMap,
      },
    };

    store = mockStore(mockState);

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedCollectionsOverview />
        </Provider>
      </BrowserRouter>
    );
  });
  test("render Collections-Overview Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("check for props", () => {
    expect(
      wrapper.find(CollectionsOverview).prop("collections").length
    ).toEqual(Object.keys(colllectionsMap).length);
  });
});
