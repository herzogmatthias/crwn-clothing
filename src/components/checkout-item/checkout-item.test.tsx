import React from "react";
import { CheckoutItem } from "./checkout-item.component";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ICartItem } from "../../redux/cart/ICartItem";
import {
  REMOVE_ITEM,
  ADD_ITEM,
  CLEAR_ITEM_FROM_CART,
} from "../../redux/cart/cart.types";
import { ShallowWrapper, shallow } from "enzyme";
import { ArrowContainer, RemoveButtonContainer } from "./checkout-item.styles";

describe("NON CONNECTED CHECKOUT-ITEM TESTS", () => {
  let wrapper: ShallowWrapper;
  let mockAddItem: ActionCreatorWithPayload<ICartItem, "ADD_ITEM">;
  let mockRemoveItem: ActionCreatorWithPayload<ICartItem, "REMOVE_ITEM">;
  const dispatch = jest.fn();
  let mockClearItemFromCart: ActionCreatorWithPayload<
    ICartItem,
    "CLEAR_ITEM_FROM_CART"
  >;
  const cartItem: ICartItem = {
    id: 1,
    imageUrl: "asdfasdf",
    name: "hats",
    price: 23,
    quantity: 2,
  };

  beforeEach(() => {
    mockAddItem = jest.fn((item: ICartItem) => {
      dispatch({ type: ADD_ITEM, payload: item });
    }) as any;
    mockRemoveItem = jest.fn((item: ICartItem) => {
      dispatch({ type: REMOVE_ITEM, payload: item });
    }) as any;
    mockClearItemFromCart = jest.fn((item: ICartItem) => {
      dispatch({ type: CLEAR_ITEM_FROM_CART, payload: item });
    }) as any;

    const mockProps = {
      addItem: mockAddItem,
      clearItemFromCart: mockClearItemFromCart,
      removeItem: mockRemoveItem,

      cartItem: cartItem,
    } as any;
    wrapper = shallow(<CheckoutItem {...mockProps}></CheckoutItem>);
  });
  test("render Checkout-Item Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("dispatch AddItem when right arrow is clicked", () => {
    wrapper.find(ArrowContainer).at(1).simulate("click");
    expect(mockAddItem).toHaveBeenCalledWith(cartItem);
  });
  test("dispatch removeItem when left arrow is clicked", () => {
    wrapper.find(ArrowContainer).at(0).simulate("click");
    expect(mockRemoveItem).toHaveBeenCalledWith(cartItem);
  });
  test("dispatch clearItemFromCart when Remove Button is clicked", () => {
    wrapper.find(RemoveButtonContainer).simulate("click");
    expect(mockClearItemFromCart).toHaveBeenCalledWith(cartItem);
  });
});
