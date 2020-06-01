import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { CheckoutPage, ISelectorProps } from "./checkout.component";

let wrapper: ShallowWrapper;
beforeEach(() => {
  const mockProps: ISelectorProps = {
    cartItems: [],
    total: 100,
  };

  wrapper = shallow(<CheckoutPage {...mockProps} />);
});

it("should render CheckoutPage component", () => {
  expect(wrapper).toMatchSnapshot();
});
