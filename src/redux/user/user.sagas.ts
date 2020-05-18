import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
  CHECK_USER_SESSION,
  SIGN_OUT_START,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
} from "./user.types";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import {
  emailSignInStart,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";

type EmailSignIn = ReturnType<typeof emailSignInStart>;
type SignUp = ReturnType<typeof signUpStart>;

export function* getSnapshottFromUserAuth(userAuth: any) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (err) {
    yield put(signInFailure(err.message));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshottFromUserAuth(user);
  } catch (err) {
    yield put(signInFailure(err.message));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignIn) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshottFromUserAuth(user);
  } catch (err) {
    yield put(signInFailure(err.message));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(SIGN_OUT_START, signOut);
}
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err.message));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshottFromUserAuth(userAuth);
  } catch (err) {
    yield signInFailure(err.message);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signUp({ payload: { displayName, email, password } }: SignUp) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield createUserProfileDocument(user, { displayName });
    yield put(signUpSuccess({ email, password }));
  } catch (err) {
    yield put(signUpFailure(err.message));
  }
}

export function* onSignUpStart() {
  yield takeLatest(SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(SIGN_UP_SUCCESS, signInWithEmail);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
