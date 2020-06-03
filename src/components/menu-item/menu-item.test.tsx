import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { MenuItem } from "./menu-item.component";
import {
  MenuItemContainer,
  BackgroundImageContainer,
} from "./menu-item.styles";

describe("NOT CONNECTED MENU-ITEM COMPONENT", () => {
  let wrapper: ShallowWrapper;
  let mockMatch: any;
  let mockHistory;
  const linkUrl = "/hats";
  const size = "large";
  const imageUrl = "testimage";

  beforeEach(() => {
    mockMatch = {
      url: "/shop",
    };

    mockHistory = {
      push: jest.fn(),
    } as any;

    const mockLocation = {} as any;
    const mockProps = {
      match: mockMatch,
      history: mockHistory,
      location: mockLocation,
      linkUrl,
      size,
      title: "hats",
      imageUrl,
    };

    wrapper = shallow(<MenuItem {...mockProps} />);
  });

  test("render MenuItem component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("call history.push with the right string when MenuItemContainer clicked", () => {
    wrapper.find(MenuItemContainer).simulate("click");

    expect(mockHistory.push).toHaveBeenCalledWith(`${mockMatch.url}${linkUrl}`);
  });

  test("pass size to MenuItemContainer as the prop size", () => {
    expect(wrapper.find(MenuItemContainer).prop("size")).toBe(size);
  });

  test("pass imageUrl to BackgroundImageContainer as the prop imageUrl", () => {
    expect(wrapper.find(BackgroundImageContainer).prop("url")).toBe(imageUrl);
  });
});
