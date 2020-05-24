import { graphql, MutationFunctionOptions } from "react-apollo";
import React from "react";
import { flowRight } from "lodash";
import {
  TOGGLE_CART_HIDDEN,
  CLEAR_ITEM_FROM_CART,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
} from "../../graphql/mutations";
import { ApolloCurrentQueryResult } from "apollo-boost";
import { GET_ITEM_COUNT } from "../../graphql/queries";
import { ICartItem } from "../../graphql/ICartItem";
import { IShopItem } from "../../graphql/IShopItem";
import CheckoutItem from "./checkout-item.component";

interface IWithGraphqlProps {
  clearItemFromCart(
    options: MutationFunctionOptions<void, { item: ICartItem }>
  ): void;
  addItem(options: MutationFunctionOptions<void, { item: ICartItem }>): void;
  removeItem(options: MutationFunctionOptions<void, { item: ICartItem }>): void;
  cartItem: ICartItem;
}

const withGraphql = ({
  clearItemFromCart,
  cartItem,
  addItem,
  removeItem,
}: IWithGraphqlProps) => {
  return (
    <CheckoutItem
      cartItem={cartItem}
      clearItemFromCart={() =>
        clearItemFromCart({ variables: { item: cartItem } })
      }
      addItem={() => addItem({ variables: { item: cartItem } })}
      removeItem={() => removeItem({ variables: { item: cartItem } })}
    ></CheckoutItem>
  );
};

export default flowRight(
  graphql<{ item: ICartItem }, { clearItemFromCart(item: ICartItem): void }>(
    CLEAR_ITEM_FROM_CART,
    { name: "clearItemFromCart" }
  ),
  graphql<{ item: IShopItem }, { addItemToCart(item: IShopItem): void }>(
    ADD_ITEM_TO_CART,
    {
      name: "addItem",
    }
  ),
  graphql<{ item: ICartItem }, { removeItemFromCart(item: ICartItem): void }>(
    REMOVE_ITEM_FROM_CART,
    {
      name: "removeItem",
    }
  )
)(withGraphql);
