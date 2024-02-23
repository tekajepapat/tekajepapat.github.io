# tekajepapat.github.io
12 TKJ 4
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1AHE5dn_aIE9N5zYPg3i8uRjasnOkJ7U",
  authDomain: "imambeldek.firebaseapp.com",
  projectId: "imambeldek",
  storageBucket: "imambeldek.appspot.com",
  messagingSenderId: "733657311829",
  appId: "1:733657311829:web:0cf55df7982118a12742dc",
  measurementId: "G-CTX15ZJ1NM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
