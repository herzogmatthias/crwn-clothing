import {
  onSignUpSuccess,
  signInWithEmail,
  onSignUpStart,
  signUp,
  onSignOutStart,
  signOut,
  onCheckUserSession,
  isUserAuthenticated,
  onEmailSignInStart,
  onGoogleSignInStart,
  signInWithGoogle,
  getSnapshotFromUserAuth,
} from "./user.sagas";
import { takeLatest, put, call } from "redux-saga/effects";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_START,
  SIGN_OUT_START,
  CHECK_USER_SESSION,
  EMAIL_SIGN_IN_START,
  GOOGLE_SIGN_IN_START,
} from "./user.types";
import {
  auth,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import {
  signOutSuccess,
  signOutFailure,
  emailSignInStart,
  signInFailure,
  signUpStart,
  signUpFailure,
  signInSuccess,
} from "./user.actions";
import { IAuth } from "./IAuth";
import { IUserAuth } from "../../IUserAuth";
import { getCartStart } from "../cart/cart.actions";
describe("User Saga: triggers", () => {
  test("trigger on SIGN_UP_SUCCESS", () => {
    const generator = onSignUpSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(SIGN_UP_SUCCESS, signInWithEmail)
    );
  });
  test("trigger on SIGN_UP_START", () => {
    const generator = onSignUpStart();
    expect(generator.next().value).toEqual(takeLatest(SIGN_UP_START, signUp));
  });
  test("trigger on SIGN_UP_START", () => {
    const generator = onSignOutStart();
    expect(generator.next().value).toEqual(takeLatest(SIGN_OUT_START, signOut));
  });
  test("trigger on CHECK_USER_SESSION", () => {
    const generator = onCheckUserSession();
    expect(generator.next().value).toEqual(
      takeLatest(CHECK_USER_SESSION, isUserAuthenticated)
    );
  });
  test("trigger on EMAIL_SIGN_IN_START", () => {
    const generator = onEmailSignInStart();
    expect(generator.next().value).toEqual(
      takeLatest(EMAIL_SIGN_IN_START, signInWithEmail)
    );
  });
  it("trigger on GOOGLE_SIGN_IN_START", () => {
    const generator = onGoogleSignInStart();
    expect(generator.next().value).toEqual(
      takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle)
    );
  });
});

describe("sign in with google saga", () => {
  const generator = signInWithGoogle();
  test("should call signInWithPopup", () => {
    const signInWithPopup = jest.spyOn(auth, "signInWithPopup");
    generator.next();
    expect(signInWithPopup).toHaveBeenCalled();
  });
  test("should call getSnapshotFromUserAuth", () => {
    const userAuth = { uid: "asdf123" };
    expect(generator.next({ user: userAuth }).value).toEqual(
      getSnapshotFromUserAuth(userAuth)
    );
  });
});

describe("sign out saga", () => {
  const generator = signOut();

  test("call auth.signOut", () => {
    const expectSignOut = jest.spyOn(auth, "signOut");
    generator.next();
    expect(expectSignOut).toHaveBeenCalled();
  });

  test("call signOutSuccess", () => {
    expect(generator.next().value).toEqual(put(signOutSuccess()));
  });

  test("call signOutFailure on error", () => {
    const newGenerator = signOut();
    newGenerator.next();
    expect(newGenerator.throw({ message: "error" }).value).toEqual(
      put(signOutFailure("error"))
    );
  });
});

describe("on sign in with email saga", () => {
  const mockEmail = "cindy@gmail.com";
  const mockPassword = "test123";

  const mockauth: IAuth = {
    password: mockPassword,
    email: mockEmail,
  };
  const action = emailSignInStart(mockauth);
  const generator = signInWithEmail(action);
  test("call auth.createUserWithEmailAndPassword", () => {
    const createUserWithEmailAndPassword = jest.spyOn(
      auth,
      "signInWithEmailAndPassword"
    );
    generator.next();
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
  test("call signInFailure on error", () => {
    expect(generator.throw({ message: "error" }).value).toEqual(
      put(signInFailure("error"))
    );
  });
});

describe("on sign up saga", () => {
  const mockEmail = "cindy@gmail.com";
  const mockPassword = "test123";
  const mockDisplayName = "cindy";

  const mockAction = signUpStart({
    email: mockEmail,
    password: mockPassword,
    confirmPassword: mockPassword,
    displayName: mockDisplayName,
  });

  const generator = signUp(mockAction);

  test("call auth.createUserWithEmailAndPassword", () => {
    const createUserWithEmailAndPassword = jest.spyOn(
      auth,
      "createUserWithEmailAndPassword"
    );
    generator.next();
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  test("call createUserProfileDocument", () => {
    expect(generator.next({ user: null }).value).toEqual(
      createUserProfileDocument(null)
    );
  });
  test("call signUpFailure on error", () => {
    expect(generator.throw({ message: "error" }).value).toEqual(
      put(signUpFailure("error"))
    );
  });
});

describe("get snapshot from userAuth", () => {
  const mockUserAuth = null;
  const userRef = {
    data: null,
    get: () => {
      return true;
    },
  };
  const mockUser: any = {
    id: "asdfasdf",
    data: () => {
      return {
        createdAt: new Date("1.1.2020"),
        displayName: "emi",
        email: "emi@email.com",
      };
    },
  };
  const generator = cloneableGenerator(getSnapshotFromUserAuth)(mockUserAuth);
  test("call createUserProfileDocument to get userRef", () => {
    expect(generator.next().value).toEqual(
      call(createUserProfileDocument, mockUserAuth)
    );
  });
  test("call signInSuccess with correct Userdata", () => {
    generator.next(userRef);
    expect(generator.next(mockUser).value).toEqual(
      put(signInSuccess({ id: mockUser.id, ...mockUser.data() }))
    );
  });
  test("call getCartStart", () => {
    expect(generator.next(mockUser.id).value).toEqual(
      put(getCartStart(mockUser.id))
    );
  });
  test("call onSignInFailure on Error", () => {
    const newGen = generator.clone();
    expect(newGen.throw!({ message: "error" }).value).toEqual(
      put(signInFailure("error"))
    );
  });
});
describe("is user authenticated saga", () => {
  const generator = isUserAuthenticated();

  test("call getCurrentUser", () => {
    expect(generator.next().value).toEqual(getCurrentUser());
  });

  test("call getSnapshotFromUserAuth if userAuth exists", () => {
    const mockUserAuth = { uid: "123da" };
    expect(generator.next(mockUserAuth).value).toEqual(
      getSnapshotFromUserAuth(mockUserAuth)
    );
  });
});
