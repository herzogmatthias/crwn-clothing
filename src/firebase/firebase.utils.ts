import firebase, { User } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDmS2nLyIwB6Du5A9atFa1dhfX2zxe5qhQ",
  authDomain: "crwn-db-3f282.firebaseapp.com",
  databaseURL: "https://crwn-db-3f282.firebaseio.com",
  projectId: "crwn-db-3f282",
  storageBucket: "crwn-db-3f282.appspot.com",
  messagingSenderId: "772907494982",
  appId: "1:772907494982:web:e15ea1e2b2b5cb83e6a447",
  measurementId: "G-TY8X93BXVV",
};

export const createUserProfileDocument = async (
  userAuth: User | null,
  additionalData?: any
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export default firebase;
