import * as React from "react";
import { ICartItem } from "../../redux/cart/ICartItem";
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
import { IShopItem } from "../../redux/shop/IShopItem";

interface ICheckoutItemProps {
  cartItem: ICartItem;
  clearItemFromCart(item: ICartItem): void;
  addItem(item: IShopItem): void;
  removeItem(item: ICartItem): void;
}

function CheckoutItem({
  cartItem,
  clearItemFromCart,
  addItem,
  removeItem,
}: ICheckoutItemProps) {
  const { name, price, imageUrl, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <CheckoutItemImage src={imageUrl} alt="item"></CheckoutItemImage>
      </ImageContainer>
      <NameContainer>{name}</NameContainer>
      <QuantityContainer>
        <ArrowContainer onClick={() => removeItem(cartItem)}>
          &#10094;
        </ArrowContainer>
        <ValueContainer>{quantity}</ValueContainer>
        <ArrowContainer onClick={() => addItem(cartItem)}>
          &#10095;
        </ArrowContainer>
      </QuantityContainer>
      <PriceContainer>{price}</PriceContainer>
      <RemoveButtonContainer onClick={() => clearItemFromCart(cartItem)}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
}

export default CheckoutItem;
