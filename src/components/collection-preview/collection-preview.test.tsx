import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { CollectionPreview } from "./collection-preview.component";
import { TitleContainer } from "./collection-preview.styles";

describe("NON CONNECTED COLLECTION-PREVIEW COMPONENT", () => {
  let wrapper: ShallowWrapper;
  let mockMatch: any;
  let mockHistory;
  const mockRouteName = "hats";

  beforeEach(() => {
    mockMatch = {
      path: "/shop",
    };

    mockHistory = {
      push: jest.fn(),
    };

    const mockProps = {
      match: mockMatch,
      history: mockHistory,
      routeName: mockRouteName,
      title: "hats",
      items: [],
      location: {},
    } as any;

    wrapper = shallow(<CollectionPreview {...mockProps} />);
  });

  test("render CollectionPreview component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("call history.push with the right string when TitleContainer clicked", () => {
    wrapper.find(TitleContainer).simulate("click");

    expect(mockHistory.push).toHaveBeenCalledWith(
      `${mockMatch.path}/${mockRouteName}`
    );
  });
});
