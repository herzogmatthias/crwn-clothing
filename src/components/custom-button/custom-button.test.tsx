import React from "react";
import { shallow } from "enzyme";
import { CustomButton } from "./custom-button.component";
describe("NON CONNECTED CUSTOM-BUTTON TESTS", () => {
  test("render Custom Button", () => {
    expect(shallow(<CustomButton />)).toMatchSnapshot();
  });
});
