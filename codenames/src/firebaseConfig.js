import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD2m_JhRTq6gTNtWlbUyxBRz5UbIQYxSA",
  authDomain: "codenames-plus.firebaseapp.com",
  databaseURL: "https://codenames-plus.firebaseio.com",
  projectId: "codenames-plus",
  storageBucket: "codenames-plus.appspot.com",
  messagingSenderId: "963411455104",
  appId: "1:963411455104:web:aa4d11a8f1e77ddeb38a65",
  measurementId: "G-YQQYR68HBL",
};

export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAppAuth = firebaseApp.auth();
