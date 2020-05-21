import * as React from "react";
import { ICartItem } from "../../providers/cart/ICartItem";
import {
  CartItemContainer,
  ImgContainer,
  ItemDetailsContainer,
  NameContainer,
} from "./cart-item.styles";

export interface ICartItemProps {
  item: ICartItem;
}

export default function CartItem({
  item: { imageUrl, price, name, quantity },
}: ICartItemProps) {
  return (
    <CartItemContainer>
      <ImgContainer src={imageUrl} alt="item"></ImgContainer>
      <ItemDetailsContainer>
        <NameContainer>{name}</NameContainer>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetailsContainer>
    </CartItemContainer>
  );
}
