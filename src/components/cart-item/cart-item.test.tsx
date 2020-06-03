import React from "react";
import { shallow } from "enzyme";
import CartItem from "./cart-item.component";
import { ICartItem } from "../../redux/cart/ICartItem";

describe("NON CONNECTED CARTITEM TESTS", () => {
  let item: ICartItem = {
    id: 1,
    imageUrl: "asdf",
    name: "hats",
    price: 34,
    quantity: 2,
  };
  let wrapper = shallow(<CartItem item={item}></CartItem>);
  test("render CartItem Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
