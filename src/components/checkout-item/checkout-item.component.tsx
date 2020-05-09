import * as React from "react";

import "./checkout-item.styles.scss";
import { ICartItem } from "../../redux/cart/ICartItem";
import { ConnectedProps, connect } from "react-redux";
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";

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
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item"></img>
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div
        onClick={() => clearItemFromCart(cartItem)}
        className="remove-button"
      >
        &#10005;
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  clearItemFromCart: clearItemFromCart,
  addItem: addItem,
  removeItem: removeItem,
};
const connector = connect(null, mapDispatchToProps);
export default connect(null, mapDispatchToProps)(CheckoutItem);
