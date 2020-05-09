import { RootState } from "../root-reducer";
import { createSelector } from "reselect";

const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
