import React from "react";
import { ShallowWrapper, shallow } from "enzyme";
import FormInput from "./form-input.component";
import {
  FormInputLabelContainer,
  FormInputContainer,
} from "./form-input.styles";

describe("NON CONNECTED FORM-INPUT TESTS", () => {
  let wrapper: ShallowWrapper;
  let mockHandleChange: any;

  beforeEach(() => {
    mockHandleChange = jest.fn();

    const mockProps = {
      label: "email",
      value: "test@gmail.com",
      handleChange: mockHandleChange,
      name: "email",
      type: "email",
      required: true,
    };

    wrapper = shallow(<FormInput {...mockProps} />);
  });

  test("render FormInput component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("call handleChange method when input changes", () => {
    wrapper.find(FormInputContainer).simulate("change");

    expect(mockHandleChange).toHaveBeenCalled();
  });

  test("render FormInputLabel if there is a label", () => {
    expect(wrapper.exists(FormInputLabelContainer)).toBe(true);
  });

  test("should not render FormInputLabel if there is no label", () => {
    const mockNewProps = {
      label: "",
      value: "test@gmail.com",
      handleChange: mockHandleChange,
      name: "email",
      type: "email",
      required: true,
    };

    const newWrapper = shallow(<FormInput {...mockNewProps} />);

    expect(newWrapper.exists(FormInputLabelContainer)).toBe(false);
  });
});
