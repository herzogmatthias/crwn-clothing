import * as React from "react";
import { ICartItem } from "../../redux/cart/ICartItem";
import {
  CartItemContainer,
  ImgContainer,
  ItemDetailsContainer,
  NameContainer,
} from "./cart-item.styles";

export interface ICartItemProps {
  item: ICartItem;
}

function CartItem({
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

export default React.memo(CartItem);
