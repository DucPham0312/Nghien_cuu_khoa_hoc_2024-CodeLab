// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt99Y-23hKNIKYXiPun5VPo60HI5BKgT8",
  authDomain: "codelab-14068.firebaseapp.com",
  projectId: "codelab-14068",
  storageBucket: "codelab-14068.appspot.com",
  messagingSenderId: "492976287545",
  appId: "1:492976287545:web:a0aaa33a566ed6aeb182e8",
  measurementId: "G-W4X4PLGY7R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
