import React from "react";
import { default as ConnectedCartIcon, CartIcon } from "./cart-icon.component";
import { ReactWrapper, mount, ShallowWrapper, shallow } from "enzyme";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ICartItem } from "../../redux/cart/ICartItem";
import { CartIconContainer, ItemCountContainer } from "./cart-icon.styles";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { TOGGLE_CART_HIDDEN } from "../../redux/cart/cart.types";

describe("CONNECTED CARTICON TESTS", () => {
  let wrapper: ReactWrapper;

  const itemCount = 4;
  let mockStore = configureStore([]);
  const cartItems: ICartItem[] = [
    { id: 1, imageUrl: "asdfasdf", name: "hats", price: 23, quantity: 2 },
    { id: 2, imageUrl: "asdfasdf", name: "hats", price: 23, quantity: 2 },
  ];
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    const mockState = {
      cart: {
        itemCount: 0,
        cartItems: cartItems,
      },
    };

    store = mockStore(mockState);

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedCartIcon />
        </Provider>
      </BrowserRouter>
    );
  });
  test("render CartIcon Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("check Props", () => {
    expect(wrapper.find(CartIcon).prop("itemCount")).toEqual(itemCount);
  });
});

describe("NOT CONNECTED CARTICON TESTS", () => {
  let wrapper: ShallowWrapper;
  let mockAction: ActionCreatorWithoutPayload<"TOGGLE_CART_HIDDEN">;
  const dispatch = jest.fn();
  beforeEach(() => {
    mockAction = jest.fn(() => {
      dispatch({ type: TOGGLE_CART_HIDDEN, payload: undefined });
    }) as any;

    const mockProps = {
      toggleCartHidden: mockAction,
      itemCount: 4,
    } as any;
    wrapper = shallow(<CartIcon {...mockProps}></CartIcon>);
  });
  test("dispatch action when button is clicked", () => {
    wrapper.find(CartIconContainer).simulate("click");
    expect(mockAction).toHaveBeenCalled();
  });
  test("render the itemCount as the text", () => {
    const itemCount = parseInt(wrapper.find(ItemCountContainer).text());
    expect(itemCount).toBe(4);
  });
});
