import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "./IUserState";
import { signInSuccess, signInFailure } from "./user.actions";
import { IUserAuth } from "../../IUserAuth";

const initialState: IUserState = {
  currentUser: null,
  error: "",
};

const userReducer = createReducer(initialState, {
  [signInSuccess.type]: (state, action: PayloadAction<IUserAuth | null>) => {
    state.currentUser = action.payload;
    state.error = "";
  },
  [signInFailure.type]: (state, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
});

export default userReducer;
