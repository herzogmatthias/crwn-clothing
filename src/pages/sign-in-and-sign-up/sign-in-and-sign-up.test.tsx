import React from "react";
import { ShallowWrapper, shallow } from "enzyme";
import SignInAndSignUp from "./sign-in-and-sign-up.component";

describe("SIGN-IN-AND-SIGN-UP TESTS", () => {
  let wrapper: ShallowWrapper = shallow(<SignInAndSignUp></SignInAndSignUp>);

  test("render SignInAndSignUp Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
