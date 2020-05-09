import { createAction } from "@reduxjs/toolkit";
import { TOGGLE_CART_HIDDEN, ADD_ITEM } from "./cart.types";
import { withPayloadType } from "../genericActionPayloadType";
import { IShopItem } from "../../pages/shop/IShopItem";
import { ICartItem } from "./ICartItem";

export const toggleCartHidden = createAction(TOGGLE_CART_HIDDEN);
export const addItem = createAction(ADD_ITEM, withPayloadType<IShopItem>());
