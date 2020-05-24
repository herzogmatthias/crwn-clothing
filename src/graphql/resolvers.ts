import { gql, Resolvers } from "apollo-boost";
import {
  addItemToCart,
  getCartItemsCount,
  getCartItemsTotal,
  removeItemFromCart,
  filterItemFromCart,
} from "./cart.utils";
import {
  GET_CART_HIDDEN,
  GET_CART_ITEMS,
  GET_ITEM_COUNT,
  GET_TOTAL,
  GET_CURRENT_USER,
} from "./queries";
import { ICartItem } from "./ICartItem";

export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }
  extend type DateTime {
    nanoseconds: Int!
    seconds: Int!
  }
  extend type User {
    id: ID!
    displayName: String!
    email: String!
    createdAt: DateTime!
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
    SetCurrentUser(user: User!): User!
    RemoveItemFromCart(item: Item!): [Item]!
    ClearItemFromCart(item: Item!): [Item]!
  }
`;

const updateCartItemsRelatedQueries = (
  cache: any,
  newCartItems: ICartItem[]
) => {
  cache.writeQuery({
    query: GET_ITEM_COUNT,
    data: { itemCount: getCartItemsCount(newCartItems) },
  });

  cache.writeQuery({
    query: GET_TOTAL,
    data: { cartTotal: getCartItemsTotal(newCartItems) },
  });

  cache.writeQuery({
    query: GET_CART_ITEMS,
    data: { cartItems: newCartItems },
  });
};

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

      updateCartItemsRelatedQueries(cache, newCartItems);
    },

    removeItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
      const newCartItems = removeItemFromCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);
    },
    clearItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
      const newCartItems = filterItemFromCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);
    },
    setCurrentUser: (_root, { user }, { cache }) => {
      console.log(user);
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: { currentUser: user },
      });

      return user;
    },
  },
};
