import { createAction } from "@reduxjs/toolkit";
import { UPDATE_COLLECTIONS } from "./shop.types";
import { withPayloadType } from "../genericActionPayloadType";
import { ICategoryMap } from "./ICategoryMap";

export const updateCollections = createAction(
  UPDATE_COLLECTIONS,
  withPayloadType<ICategoryMap>()
);
