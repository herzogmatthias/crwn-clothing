import firebase, { User } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { ICategory } from "../redux/shop/ICategory";
import { ICategoryMap } from "../redux/shop/ICategoryMap";
import { resolve } from "dns";
import { IUserAuth } from "../IUserAuth";

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

export const getOrCreateDocumentCartForUser = async (uuid: string) => {
  const cartRef = firestore.doc(`carts/${uuid}`);
  const snapshot = await cartRef.get();
  if (!snapshot.exists) {
    try {
      await cartRef.set({ items: [] });
    } catch (error) {
      console.log("error creating cart", error.message);
    }
  }
  return cartRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const getCurrentUser = (): Promise<firebase.User | null> => {
  return new Promise((res, rej) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      res(userAuth);
    }, rej);
  });
};

export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: Omit<ICategory, "id" | "routeName">[]
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach((val, ind) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, val);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (
  collections: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  }) as ICategory[];

  return transformedCollections.reduce(
    (accumulator: ICategoryMap, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },
    {}
  );
};

export default firebase;
