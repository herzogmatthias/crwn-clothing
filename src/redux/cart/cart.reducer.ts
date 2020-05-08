import { ICartState } from "./ICartState";
import { createReducer } from "@reduxjs/toolkit";
import { toggleCartHidden } from "./cart.actions";

const initialState: ICartState = {
  hidden: true,
};

const cartReducer = createReducer(initialState, {
  [toggleCartHidden.type]: (state, action) => {
    state.hidden = !state.hidden;
  },
});

export default cartReducer;
