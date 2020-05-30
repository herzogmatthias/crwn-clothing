import userReducer, { initialState } from "./user.reducer";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
} from "./user.actions";
import { IUserState } from "./IUserState";
import { IUserAuth } from "../../IUserAuth";

describe("User Reducer", () => {
  let prevState: IUserState;
  beforeEach(() => {
    prevState = initialState;
  });
  test("return initial state on undefined", () => {
    expect(userReducer(undefined, { type: null })).toEqual(initialState);
  });
  test("set user to payload in signInSuccess action", () => {
    const mockUser: IUserAuth = {
      displayName: "Mike",
      email: "mike@gmail.com",
      id: "asdfw234afd",
      createdAt: new Date("01.05.2020"),
    };
    expect(userReducer(prevState, signInSuccess(mockUser)).currentUser).toEqual(
      mockUser
    );
  });
  test("set the error to payload in signInFailure action", () => {
    const mockError = "I am an Error";
    expect(userReducer(prevState, signInFailure(mockError)).error).toEqual(
      mockError
    );
  });
  test("set user to null in signOutSuccess action", () => {
    const mockUser: IUserAuth = {
      displayName: "Mike",
      email: "mike@gmail.com",
      id: "asdfw234afd",
      createdAt: new Date("01.05.2020"),
    };

    expect(
      userReducer({ ...prevState, currentUser: mockUser }, signOutSuccess())
        .currentUser
    ).toEqual(null);
  });
  test("set the error to payload in signOutFailure action", () => {
    const mockError = "I am an Error";
    expect(userReducer(prevState, signOutFailure(mockError)).error).toEqual(
      mockError
    );
  });
  test("set the error to payload in signUpFailure action", () => {
    const mockError = "I am an Error";
    expect(userReducer(prevState, signUpFailure(mockError)).error).toEqual(
      mockError
    );
  });
});
