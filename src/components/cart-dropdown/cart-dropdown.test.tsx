import React from "react";
import { ReactWrapper, mount, shallow, ShallowWrapper } from "enzyme";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { TOGGLE_CART_HIDDEN } from "../../redux/cart/cart.types";
import {
  default as ConnectedCartDropdown,
  CartDropdown,
} from "./cart-dropdown.component";
import { Provider } from "react-redux";
import {
  CustomButtonContainer,
  EmptyMessageContainer,
} from "./cart-dropdown.styles";
import { BrowserRouter } from "react-router-dom";
import { ICartItem } from "../../redux/cart/ICartItem";
import CartItem from "../cart-item/cart-item.component";

describe("CONNECTED CARTDROPDOWN TESTS", () => {
  let wrapper: ReactWrapper;

  const cartItems: ICartItem[] = [
    { id: 1, imageUrl: "asdfasdf", name: "hats", price: 23, quantity: 2 },
    { id: 2, imageUrl: "asdfasdf", name: "hats", price: 23, quantity: 2 },
  ];

  let mockStore = configureStore([]);
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    const mockState = {
      cart: {
        cartItems: cartItems,
      },
    };

    store = mockStore(mockState);

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedCartDropdown />
        </Provider>
      </BrowserRouter>
    );
  });
  test("render CartDropdown Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("check Props", () => {
    expect(wrapper.find(CartDropdown).prop("cartItems")).toEqual(cartItems);
  });
});

describe("NOT CONNECTED CARTDROPDOWN TESTS", () => {
  let wrapper: ShallowWrapper;
  let mockAction: ActionCreatorWithoutPayload<"TOGGLE_CART_HIDDEN">;
  let mockHistory: { push: Function };
  const push = jest.fn<any, [string]>((url) => true);
  const cartItems: ICartItem[] = [
    { id: 1, imageUrl: "asdfasdf", name: "hats", price: 23, quantity: 2 },
    { id: 2, imageUrl: "asdfasdf", name: "hats", price: 23, quantity: 2 },
  ];

  beforeEach(() => {
    const dispatch = jest.fn();
    mockAction = jest.fn(() => {
      dispatch({ type: TOGGLE_CART_HIDDEN, payload: undefined });
    }) as any;

    mockHistory = {
      push: push,
    };
    const mockProps = {
      history: mockHistory,
      toggleCartHidden: mockAction,
      cartItems: cartItems,
    } as any;
    wrapper = shallow(<CartDropdown {...mockProps}></CartDropdown>);
  });
  test("call history.push and dispatch action when button is clicked", () => {
    wrapper.find(CustomButtonContainer).simulate("click");
    expect(mockHistory.push).toHaveBeenCalledWith("/checkout");
    expect(mockAction).toHaveBeenCalled();
  });
  test("render an equal number of CartItem components as the cartItems prop", () => {
    expect(wrapper.find(CartItem).length).toEqual(cartItems.length);
  });
  test("render EmptyMessageContainer if cartItems is empty", () => {
    const mockProps = {
      history: mockHistory,
      toggleCartHidden: mockAction,
      cartItems: [],
    } as any;

    const newWrapper = shallow(<CartDropdown {...mockProps} />);
    expect(newWrapper.exists(EmptyMessageContainer)).toBe(true);
  });
});
