import { createAction } from "@reduxjs/toolkit";
import { TOGGLE_CART_HIDDEN } from "./cart.types";

export const toggleCartHidden = createAction(TOGGLE_CART_HIDDEN);
