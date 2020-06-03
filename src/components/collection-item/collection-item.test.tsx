import React from "react";
import { IShopItem } from "../../redux/shop/IShopItem";
import { ShallowWrapper, shallow } from "enzyme";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ICartItem } from "../../redux/cart/ICartItem";
import { ADD_ITEM } from "../../redux/cart/cart.types";
import { CollectionItem } from "./collection-item.component";
import {
  CustomButtonContainer,
  NameContainer,
  PriceContainer,
  ImageContainer,
} from "./collection-item.styles";
describe("NON CONNECTED COLLECTION-ITEM TESTS", () => {
  let wrapper: ShallowWrapper;
  let mockAddItem: ActionCreatorWithPayload<IShopItem, "ADD_ITEM">;
  const dispatch = jest.fn();
  const item: IShopItem = {
    id: 2,
    imageUrl: "asdf234",
    name: "hat",
    price: 34,
  };
  beforeEach(() => {
    mockAddItem = jest.fn((item: ICartItem) => {
      dispatch({ type: ADD_ITEM, payload: item });
    }) as any;
    const mockProps = {
      item,
      addItem: mockAddItem,
    };
    wrapper = shallow(<CollectionItem {...mockProps} />);
  });
  test("render CollectionItem Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("call addItem when AddButton clicked", () => {
    wrapper.find(CustomButtonContainer).simulate("click");

    expect(mockAddItem).toHaveBeenCalledWith(item);
  });

  test("render imageUrl as a prop on BackgroundImage", () => {
    expect(wrapper.find(ImageContainer).prop("imageUrl")).toBe(item.imageUrl);
  });

  test("render name prop in NameContainer", () => {
    expect(wrapper.find(NameContainer).text()).toBe(item.name);
  });

  test("render price prop in PriceContainer", () => {
    const price = parseInt(wrapper.find(PriceContainer).text().substr(1, 2));
    expect(price).toBe(item.price);
  });
});
