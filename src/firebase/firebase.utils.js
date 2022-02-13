import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyAmOyNdXMtRaTFbTna_Pp3tTilyNc1xNJ4",
  authDomain: "crwn-db-6951e.firebaseapp.com",
  projectId: "crwn-db-6951e",
  storageBucket: "crwn-db-6951e.appspot.com",
  messagingSenderId: "887571832867",
  appId: "1:887571832867:web:6a3cae35b5556e27d55196",
  measurementId: "G-ZKNH75RG4G",
};

firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
