import { IUserAuth } from "../../IUserAuth";

export interface IUserState {
  currentUser: IUserAuth | null;
}
