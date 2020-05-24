import * as React from "react";
import { ICartItem } from "../../graphql/ICartItem";
import {
  NameContainer,
  QuantityContainer,
  ImageContainer,
  CheckoutItemContainer,
  ArrowContainer,
  ValueContainer,
  PriceContainer,
  RemoveButtonContainer,
  CheckoutItemImage,
} from "./checkout-item.styles";
import { IShopItem } from "../../graphql/IShopItem";
import { useMutation } from "react-apollo";
import {
  CLEAR_ITEM_FROM_CART,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
} from "../../graphql/mutations";

interface ICheckoutItemProps {
  cartItem: ICartItem;
  clearItemFromCart?(item: ICartItem): void;
  addItem?(item: IShopItem): void;
  removeItem?(item: ICartItem): void;
}

function CheckoutItem({ cartItem }: ICheckoutItemProps) {
  const [clearItemFromCart] = useMutation<
    { clearItemFromCart: () => {} },
    { item: ICartItem }
  >(CLEAR_ITEM_FROM_CART, { variables: { item: cartItem } });
  const [addItem] = useMutation<{ addItem: () => {} }, { item: ICartItem }>(
    ADD_ITEM_TO_CART,
    { variables: { item: cartItem } }
  );
  const [removeItem] = useMutation<
    { removeItem: () => {} },
    { item: ICartItem }
  >(REMOVE_ITEM_FROM_CART, { variables: { item: cartItem } });
  const { name, price, imageUrl, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <CheckoutItemImage src={imageUrl} alt="item"></CheckoutItemImage>
      </ImageContainer>
      <NameContainer>{name}</NameContainer>
      <QuantityContainer>
        <ArrowContainer onClick={() => removeItem()}>&#10094;</ArrowContainer>
        <ValueContainer>{quantity}</ValueContainer>
        <ArrowContainer onClick={() => addItem()}>&#10095;</ArrowContainer>
      </QuantityContainer>
      <PriceContainer>{price}</PriceContainer>
      <RemoveButtonContainer onClick={() => clearItemFromCart()}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
}

export default CheckoutItem;
