// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCb_0KS08IdWEWLTOMypoAYmr2ES84hr_0",
  authDomain: "code-pain.firebaseapp.com",
  projectId: "code-pain",
  storageBucket: "code-pain.firebasestorage.app",
  messagingSenderId: "954374371948",
  appId: "1:954374371948:web:0edb4d4b59852d8b7cf649",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
