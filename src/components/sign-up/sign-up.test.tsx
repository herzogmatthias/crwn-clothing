import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { SignUp } from "./sign-up.component";
import { ISignUpInfo } from "./ISignUpInfo";
import { act } from "react-dom/test-utils";

describe("NON CONNECTED SIGN UP TEST", () => {
  let wrapper: ReactWrapper;
  const mockPw = "asdf123";
  const mockDisplayName = "asdf";
  const mockEmail = "asasdf@gmail.com";
  let mockSignUpStart = jest.fn<any, [ISignUpInfo]>();
  const mockProps = {
    signUpStart: mockSignUpStart,
  } as any;
  wrapper = mount(<SignUp {...mockProps}></SignUp>);

  test("render SignUp Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("set the password value", async () => {
    await global.actions(wrapper, () => {
      wrapper.find('FormInput[name="password"]').prop<any>("handleChange")({
        target: { value: mockPw, name: "password" },
      } as any);
    });

    expect(wrapper.find('FormInput[name="password"]').prop("value")).toEqual(
      mockPw
    );
  });
  test("submit should fail with two different passwords", async () => {
    await global.actions(wrapper, () =>
      wrapper.find('FormInput[name="password"]').prop<any>("handleChange")({
        target: { value: mockPw, name: "password" },
      } as any)
    );
    await global.actions(wrapper, () =>
      wrapper
        .find('FormInput[name="confirmPassword"]')
        .prop<any>("handleChange")({
        target: { value: mockPw + "asdf", name: "confirmPassword" },
      } as any)
    );
    const alert = jest.spyOn(window, "alert").mockImplementation(() => {});
    wrapper.find("form").simulate("submit");
    expect(alert).toHaveBeenCalled();
  });
  test("submit should pass with same passwords", async () => {
    const signUpInfo: ISignUpInfo = {
      email: mockEmail,
      displayName: mockDisplayName,
      confirmPassword: mockPw,
      password: mockPw,
    };
    await global.actions(wrapper, () =>
      wrapper.find('FormInput[name="password"]').prop<any>("handleChange")({
        target: { value: mockPw, name: "password" },
      } as any)
    );
    await global.actions(wrapper, () =>
      wrapper
        .find('FormInput[name="confirmPassword"]')
        .prop<any>("handleChange")({
        target: { value: mockPw, name: "confirmPassword" },
      } as any)
    );
    await global.actions(wrapper, () =>
      wrapper.find('FormInput[name="displayName"]').prop<any>("handleChange")({
        target: { value: mockDisplayName, name: "displayName" },
      } as any)
    );
    await global.actions(wrapper, () =>
      wrapper.find('FormInput[name="email"]').prop<any>("handleChange")({
        target: { value: mockEmail, name: "email" },
      } as any)
    );
    wrapper.find("form").simulate("submit");
    expect(mockSignUpStart).toHaveBeenCalledWith(signUpInfo);
  });
});
