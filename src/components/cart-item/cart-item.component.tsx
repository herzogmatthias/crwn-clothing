import * as React from "react";
import "./cart-item.styles.scss";
import { ICartItem } from "../../redux/cart/ICartItem";

export interface ICartItemProps {
  item: ICartItem;
}

export default function CartItem({
  item: { imageUrl, price, name, quantity },
}: ICartItemProps) {
  return (
    <div className="cart-item">
      <img src={imageUrl} alt="item"></img>
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
}
