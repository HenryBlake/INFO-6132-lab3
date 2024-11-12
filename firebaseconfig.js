// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3onDb0TvEK1ilwUGy0x0RwUo4Fpoga0",
  authDomain: "info-6132-3a292.firebaseapp.com",
  databaseURL: "https://info-6132-3a292-default-rtdb.firebaseio.com",
  projectId: "info-6132-3a292",
  storageBucket: "info-6132-3a292.appspot.com",
  messagingSenderId: "778409130828",
  appId: "1:778409130828:web:334e3b03582da4d139ade9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
