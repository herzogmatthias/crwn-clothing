import { gql } from "apollo-boost";

export const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

export const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

export const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

export const GET_TOTAL = gql`
  {
    total @client
  }
`;

export const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;
