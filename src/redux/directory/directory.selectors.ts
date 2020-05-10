import { RootState } from "../root-reducer";
import { createSelector } from "reselect";

const selectDirectory = (state: RootState) => state.directory;

export const selectDirectorySections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);
