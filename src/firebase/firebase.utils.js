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

export const createUserProfileDocument = async (userAuth, additionalData) => {  // passed into app.js
  if (!userAuth) return; // if user signed out userAuth object is null

  // query inside firestore if obj exists. firestore library gives either 1)queryreference or 2)querysnapshot. and these will be in either Document or Collection firestore always returns either of this, even if nothing exists from that query.

  // console.log(firestore.doc('users/adodjfaiojfa'))
  // documentreference vs collection reference. docref obj allows CRUD methods. Get snapshot object using .get(). documentRef.get() or collectionRef.get(). former returns a documentSnapshot object, latter retruns querySnapshot obj.

  const userRef = firestore.doc(`users/${userAuth.uid}`); // check if user exists
  const snapShot = await userRef.get(); // get snapshot obj
  // console.log(snapShot) // has an 'exists' property

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // if snapshot doesn't exist, create this new user data below
    try {
      await userRef.set({ // asynchronous request to db to store this data - check firestore to see new creation
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef; // chance that we want to use userRef obj to do something else
}


firebase.initializeApp(config);

export const auth = firebase.auth() // exported to app.js
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider); // signinwithpopup can use many methods of signing in, twitter, fb etc. we only want the google one. This func is exported to sign-in.component, to create a custom button onclick signinwithgoogle

export default firebase; // in case we want the whole library
