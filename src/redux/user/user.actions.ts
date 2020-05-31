import { createAction } from "@reduxjs/toolkit";
import { withPayloadType } from "../genericActionPayloadType";
import { IUserAuth } from "../../IUserAuth";
import {
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  CHECK_USER_SESSION,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "./user.types";
import { IAuth } from "./IAuth";
import { ISignUpInfo } from "../../components/sign-up/ISignUpInfo";

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

export const signOutStart = createAction(SIGN_OUT_START);
export const signOutSuccess = createAction(SIGN_OUT_SUCCESS);
export const signOutFailure = createAction<string>(SIGN_OUT_FAILURE);

export const signUpStart = createAction(
  SIGN_UP_START,
  withPayloadType<ISignUpInfo>()
);
export const signUpSuccess = createAction(
  SIGN_UP_SUCCESS,
  withPayloadType<IAuth>()
);
export const signUpFailure = createAction(
  SIGN_UP_FAILURE,
  withPayloadType<string>()
);

export const checkUserSession = createAction(CHECK_USER_SESSION);
