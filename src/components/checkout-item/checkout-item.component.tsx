import * as React from "react";
import { ICartItem } from "../../providers/cart/ICartItem";
import { connect } from "react-redux";
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
import { CartContext } from "../../providers/cart/cart.provider";

interface ICheckoutItemProps {
  cartItem: ICartItem;
}

function CheckoutItem({ cartItem }: ICheckoutItemProps) {
  const { name, price, imageUrl, quantity } = cartItem;
  const { addItem, removeItem, clearItemFromCart } = React.useContext(
    CartContext
  );
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
