import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { CheckoutPage, ISelectorProps } from "./checkout.component";
describe("NON CONNECTED CHECKOUT TESTS", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const mockProps: ISelectorProps = {
      cartItems: [],
      total: 100,
    };

    wrapper = shallow(<CheckoutPage {...mockProps} />);
  });

  test("render CheckoutPage component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
