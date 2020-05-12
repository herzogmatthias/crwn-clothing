import * as React from "react";
import { ICartItem } from "../../redux/cart/ICartItem";
import { ConnectedProps, connect } from "react-redux";
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";
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

type ICheckoutItemProps = ConnectedProps<typeof connector> & {
  cartItem: ICartItem;
};

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

const mapDispatchToProps = {
  clearItemFromCart: clearItemFromCart,
  addItem: addItem,
  removeItem: removeItem,
};
const connector = connect(null, mapDispatchToProps);
export default connect(null, mapDispatchToProps)(CheckoutItem);
