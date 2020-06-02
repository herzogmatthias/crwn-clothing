import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { CollectionPage } from "./collection.component";
import { ICategory } from "../../redux/shop/ICategory";
import { IShopItem } from "../../redux/shop/IShopItem";
import { CollectionItemContainer } from "./collection.styles";
describe("NON CONNECTED COLLECTIONPAGE TESTS", () => {
  let wrapper: ShallowWrapper;
  let mockItems: IShopItem[] = [
    { id: 1, imageUrl: "asdfsd", name: "hat", price: 23 },
    { id: 2, imageUrl: "asdfsd", name: "trousers", price: 23 },
    { id: 3, imageUrl: "asdfsd", name: "tshirt", price: 23 },
  ];
  beforeEach(() => {
    const mockCollection: ICategory = {
      items: mockItems,
      title: "Test",
      id: "asdf213",
      routeName: "/hats",
    };
    wrapper = shallow(<CollectionPage collection={mockCollection} />);
  });

  it("should render the CollectionPage component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the same number of CollectionItems as collection array", () => {
    expect(wrapper.find(CollectionItemContainer).length).toBe(mockItems.length);
  });
});
