import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "./IUserState";
import { setCurrentUser } from "./user.actions";
import { IUserAuth } from "../../IUserAuth";

const initialState: IUserState = {
  currentUser: null,
};

const userReducer = createReducer(initialState, {
  [setCurrentUser.type]: (state, action: PayloadAction<IUserAuth | null>) => {
    state.currentUser = action.payload;
  },
});

export default userReducer;
