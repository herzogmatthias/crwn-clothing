import { createAction } from "@reduxjs/toolkit";
import { withPayloadType } from "../genericActionPayloadType";
import { IUserAuth } from "../../IUserAuth";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = createAction(
  SET_CURRENT_USER,
  withPayloadType<IUserAuth | null>()
);
