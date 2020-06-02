import React from "react";
import { shallow } from "enzyme";
import HomePage from "./homepage.component";

describe("HOMEPAGE TESTS", () => {
  let wrapper = shallow(<HomePage></HomePage>);
  test("render Homepage", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
