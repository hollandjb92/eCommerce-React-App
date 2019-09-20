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


export const addCollectionAndDocuments = async (collectionName, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionName);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocReference = collectionRef.doc();
    batch.set(newDocReference, obj)
  });

  return await batch.commit();

};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {
      title,
      items
    } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator;
  }, {})
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth)
    }, reject)
  })
}



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase;