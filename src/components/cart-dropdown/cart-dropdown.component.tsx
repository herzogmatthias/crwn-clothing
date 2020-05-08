import * as React from "react";
import "./cart-dropdown.styles.scss";
import { CustomButton } from "../custom-button/custom-button.component";

export interface ICartDropdownProps {}

export default function CartDropdown(props: ICartDropdownProps) {
  return (
    <div className="cart-dropdown">
      <div className="cart-items"></div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
}
