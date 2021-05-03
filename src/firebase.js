import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCozpgaiUZgrrIYQpVNFyN3Vv7noqKIFJM",
    authDomain: "p1cky-89cb0.firebaseapp.com",
    databaseURL: "https://p1cky-89cb0-default-rtdb.firebaseio.com",
    projectId: "p1cky-89cb0",
    storageBucket: "p1cky-89cb0.appspot.com",
    messagingSenderId: "709304539538",
    appId: "1:709304539538:web:3e603c88229f7475db094b",
    measurementId: "G-SNKDQXL98K"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
};