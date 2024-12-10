



// Import the necessary Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDQwHKZ5pvx65WoKXk8TdgXlng2hvUlD-I",
  authDomain: "clone-998e8.firebaseapp.com",
  projectId: "clone-998e8",
  storageBucket: "clone-998e8.firebasestorage.app",
  messagingSenderId: "959022564152",
  appId: "1:959022564152:web:c2f05c34376f579e3e37cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
export const auth = getAuth(app);  // For authentication
export const db = getFirestore(app);  // For Firestore


