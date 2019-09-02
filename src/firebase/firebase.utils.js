import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyADKOHBZ9OmsF1hGoqyXyfpZuUrW8auu-g",
  authDomain: "ecommerce-react-73ffd.firebaseapp.com",
  databaseURL: "https://ecommerce-react-73ffd.firebaseio.com",
  projectId: "ecommerce-react-73ffd",
  storageBucket: "",
  messagingSenderId: "780657831286",
  appId: "1:780657831286:web:b9b76adc999a7008"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get();

  //creating user if they don't already exist
  if (!snapShot.exists) {
    const {
      displayName,
      email
    } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log("error creating user: " + err.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;