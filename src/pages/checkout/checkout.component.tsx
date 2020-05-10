import * as React from "react";
import "./checkout.styles.scss";
import { ICartItem } from "../../redux/cart/ICartItem";
import { ConnectedProps, connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeButton from "../../components/stripe-button/stripe-button.component";

interface ISelectorProps {
  cartItems: ICartItem[];
  total: number;
}

type ICheckoutPageProps = ConnectedProps<typeof connector>;

function CheckoutPage({ cartItems, total }: ICheckoutPageProps) {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return (
          <CheckoutItem cartItem={cartItem} key={cartItem.id}></CheckoutItem>
        );
      })}
      <div className="total">
        <span>TOTAL: ${total}</span>
      </div>
      <div className="test-warning">
        *Please use the following test credit card for payments*
        <br /> 4242 4242 4242 4242 - Exp: 01/21 - CVV: 123
      </div>
      <StripeButton price={total}></StripeButton>
    </div>
  );
}
const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector<RootState, ISelectorProps>({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
