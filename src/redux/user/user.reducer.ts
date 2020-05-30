import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "./IUserState";
import {
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
} from "./user.actions";
import { IUserAuth } from "../../IUserAuth";

export const initialState: IUserState = {
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
  [signOutFailure.type]: (state, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
  [signOutSuccess.type]: (state, action) => {
    state.currentUser = null;
    state.error = "";
  },
  [signUpFailure.type]: (state, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
});

export default userReducer;
