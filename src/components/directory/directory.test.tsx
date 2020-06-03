import React from "react";
import { ISection } from "../../redux/directory/ISection";
import {
  default as ConntectedDirectory,
  Directory,
} from "./directory.component";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { ReactWrapper, mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

describe("CONNECTED DIRECTORY TESTS", () => {
  let wrapper: ReactWrapper;
  let mockStore = configureStore([]);
  let store: MockStoreEnhanced<unknown, {}>;
  const sections: ISection[] = [
    {
      id: 1,
      imageUrl: "asdasdf",
      linkUrl: "asdfasdf",
      title: "Mens",
      size: "lg",
    },
    { id: 2, imageUrl: "asdasdf", linkUrl: "asdfasdf", title: "Mens" },
  ];
  beforeEach(() => {
    const mockState = {
      directory: {
        sections: sections,
      },
    };

    store = mockStore(mockState);

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConntectedDirectory />
        </Provider>
      </BrowserRouter>
    );
  });
  test("render Directory Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("check for props", () => {
    expect(wrapper.find(Directory).prop("sections").length).toEqual(
      sections.length
    );
  });
});
