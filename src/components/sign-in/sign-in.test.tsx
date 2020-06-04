import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { SignIn } from "./sign-in.component";
describe("NON CONNECTED SIGN-IN TESTS", () => {
  const mockGoogleSignInStart = jest.fn();
  const mockEmailSignInStart = jest.fn();
  const mockEmail = "asdf@gmail.com";
  const mockPassword = "asdf";
  let wrapper: ReactWrapper;
  const mockProps = {
    emailSignInStart: mockEmailSignInStart,
    googleSignInStart: mockGoogleSignInStart,
  } as any;

  beforeEach(() => {
    wrapper = mount(<SignIn {...mockProps}></SignIn>);
  });
  test("render SignIn Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("start google sign in by clicking Button", () => {
    wrapper.find("CustomButton").at(1).simulate("click");
    expect(mockGoogleSignInStart).toHaveBeenCalled();
    expect(mockEmailSignInStart).not.toHaveBeenCalled();
  });
  test("start email sign in by submitting form", async () => {
    await global.actions(wrapper, () =>
      wrapper.find('FormInput[name="email"]').prop<any>("handleChange")({
        target: { value: mockEmail, name: "email" },
      } as any)
    );
    await global.actions(wrapper, () =>
      wrapper.find('FormInput[name="password"]').prop<any>("handleChange")({
        target: { value: mockPassword, name: "password" },
      } as any)
    );
    wrapper.find("form").simulate("submit");
    expect(mockEmailSignInStart).toHaveBeenCalledWith({
      email: mockEmail,
      password: mockPassword,
    });
  });
});
