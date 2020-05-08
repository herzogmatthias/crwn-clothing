import { createAction } from "@reduxjs/toolkit";
import { withPayloadType } from "../genericActionPayloadType";
import { IUserAuth } from "../../IUserAuth";
import { SET_CURRENT_USER } from "./user.types";

export const setCurrentUser = createAction(
  SET_CURRENT_USER,
  withPayloadType<IUserAuth | null>()
);
