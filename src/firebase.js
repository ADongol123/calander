// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAdb39i0vOYyheYFSQEEruz4gp-13ZlkWU",
  authDomain: "slack-clone-ff314.firebaseapp.com",
  databaseURL: "https://slack-clone-ff314.firebaseio.com",
  projectId: "slack-clone-ff314",
  storageBucket: "slack-clone-ff314.appspot.com",
  messagingSenderId: "103137946481",
  appId: "1:103137946481:web:19b7ef2e64f597919aa4d0",
  measurementId: "G-PDXZ46W87L"
};

const firebaseApp= firebase.initializeApp(firebaseConfig);
const db= firebaseApp.firestore();
 

export default db;