import firebase from 'firebase/app'
import 'firebase/auth'

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyB_Wagx1lS04DEw6rsNVMA9MlTeiERlOcw",
    authDomain: "papeleriaabc-6bb04.firebaseapp.com",
    databaseURL: "https://papeleriaabc-6bb04.firebaseio.com",
    projectId: "papeleriaabc-6bb04",
    storageBucket: "papeleriaabc-6bb04.appspot.com",
    messagingSenderId: "997879310407",
    appId: "1:997879310407:web:2762c45004d32b57352962",
    measurementId: "G-DW1L68HVLV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export function signOutGoogle(){
    firebase.auth().signOut()
}

export function loginWithGoogle(){
    let provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
        .then(snap => snap.user)
}
