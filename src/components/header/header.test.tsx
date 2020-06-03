import React from "react";
import { IUserAuth } from "../../IUserAuth";
import { default as ConnectedHeader, Header } from "./header.component";
import { ReactWrapper, mount, shallow, ShallowWrapper } from "enzyme";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ICartItem } from "../../redux/cart/ICartItem";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { OptionLink } from "./header.styles";

describe("CONNECTED HEADER TESTS", () => {
  let wrapper: ReactWrapper;
  let mockStore = configureStore([]);
  let store: MockStoreEnhanced<unknown, {}>;
  const cartItems: ICartItem[] = [
    { id: 1, imageUrl: "asdfasdf", name: "hats", price: 23, quantity: 2 },
    { id: 2, imageUrl: "asdfasdf", name: "hats", price: 23, quantity: 2 },
  ];
  const currentUser: IUserAuth = {
    createdAt: new Date("22.05.2020"),
    id: "asdlfjas",
    displayName: "asdf",
    email: "asdf@gmail.com",
  };
  beforeEach(() => {
    const mockState = {
      user: {
        currentUser: currentUser,
      },
      cart: {
        hidden: true,
        cartItems: cartItems,
      },
    };

    store = mockStore(mockState);

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ConnectedHeader />
        </Provider>
      </BrowserRouter>
    );
  });
  test("render Directory Component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("check for props", () => {
    expect(wrapper.find(Header).prop("hidden")).toEqual(true);
    expect(wrapper.find(Header).prop("currentUser")).toEqual(currentUser);
  });
});

describe("NON CONNECTED HEADER TESTS", () => {
  let wrapper: ShallowWrapper;
  const currentUser: IUserAuth = {
    createdAt: new Date("22.05.2020"),
    id: "asdlfjas",
    displayName: "asdf",
    email: "asdf@gmail.com",
  };
  let mockSignOutStart: ActionCreatorWithoutPayload<"SIGN_OUT_START">;
  beforeEach(() => {
    mockSignOutStart = jest.fn() as any;

    const mockProps = {
      hidden: true,
      currentUser: currentUser,
      signOutStart: mockSignOutStart,
    };

    wrapper = shallow(<Header {...mockProps} />);
  });

  test("render sign out link", () => {
    expect(wrapper.find(OptionLink).at(2).text()).toBe("SIGN OUT");
  });

  test("call signOutStart method when link is clicked", () => {
    wrapper.find(OptionLink).at(2).simulate("click");

    expect(mockSignOutStart).toHaveBeenCalled();
  });

  test("render sign in link if currentUser is null", () => {
    const mockProps = {
      hidden: true,
      currentUser: null,
      signOutStart: mockSignOutStart,
    };

    const newWrapper = shallow(<Header {...mockProps} />);

    expect(newWrapper.find(OptionLink).at(2).text()).toBe("SIGN IN");
  });

  test("don't render CartDropdown", () => {
    expect(wrapper.exists(CartDropdown)).toBe(false);
  });

  test("render CartDropdown if currentUser is null", () => {
    const mockProps = {
      hidden: false,
      currentUser: null,
      signOutStart: mockSignOutStart,
    };

    const newWrapper = shallow(<Header {...mockProps} />);

    expect(newWrapper.exists(CartDropdown)).toBe(true);
  });
});
