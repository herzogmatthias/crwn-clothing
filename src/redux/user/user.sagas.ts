import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
  CHECK_USER_SESSION,
} from "./user.types";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import { emailSignInStart, signInSuccess, signInFailure } from "./user.actions";

type EmailSignIn = ReturnType<typeof emailSignInStart>;

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
    put(signInFailure(err.message));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshottFromUserAuth(userAuth);
  } catch (err) {
    signInFailure(err.message);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
  ]);
}
