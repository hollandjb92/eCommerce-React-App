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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;