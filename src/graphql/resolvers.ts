import { gql, Resolvers } from "apollo-boost";
import { addItemToCart, getCartItemsCount } from "../redux/cart/cart.utils";
import { GET_CART_HIDDEN, GET_CART_ITEMS, GET_ITEM_COUNT } from "./queries";

export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }, _info) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });
      return !cartHidden;
    },
    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemsCount(newCartItems) },
      });
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });
    },
  },
};
