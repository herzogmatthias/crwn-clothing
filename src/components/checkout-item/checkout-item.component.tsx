import * as React from "react";

import "./checkout-item.styles.scss";
import { ICartItem } from "../../redux/cart/ICartItem";

export interface ICheckoutItemProps {
  cartItem: ICartItem;
}

export default function CheckoutItem({
  cartItem: { name, price, imageUrl, quantity },
}: ICheckoutItemProps) {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item"></img>
      </div>
      <span className="name">{name}</span>
      <span className="quantity">{quantity}</span>
      <span className="price">{price}</span>
      <div className="remove-button">&#10005;</div>
    </div>
  );
}
