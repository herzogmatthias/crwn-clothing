import { createAction } from "@reduxjs/toolkit";
import { withPayloadType } from "../genericActionPayloadType";
import { IUserAuth } from "../../IUserAuth";
import {
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  CHECK_USER_SESSION,
} from "./user.types";
import { IAuth } from "./IAuth";

export const googleSignInStart = createAction(GOOGLE_SIGN_IN_START);

export const emailSignInStart = createAction(
  EMAIL_SIGN_IN_START,
  withPayloadType<IAuth>()
);
export const signInSuccess = createAction(
  SIGN_IN_SUCCESS,
  withPayloadType<IUserAuth | null>()
);
export const signInFailure = createAction(
  SIGN_IN_FAILURE,
  withPayloadType<string>()
);

export const checkUserSession = createAction(CHECK_USER_SESSION);
