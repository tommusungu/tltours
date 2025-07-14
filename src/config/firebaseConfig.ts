// firebaseConfig.js
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2z7VHfr5A6bohyIFceFPgDY1AeXdc2L0",
  authDomain: "morara-fd602.firebaseapp.com",
  projectId: "morara-fd602",
  storageBucket: "morara-fd602.appspot.com",
  messagingSenderId: "390777304155",
  appId: "1:390777304155:web:fca91756385e171216fb7e",
  measurementId: "G-WVQ0YXLRGZ"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { app, firestore };
