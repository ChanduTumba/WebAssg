// Import Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNDLu9SC-IgoAJ9aJ-BlR9l16prh7-APs",
    authDomain: "tumba-99b8a.firebaseapp.com",
    projectId: "tumba-99b8a",
    storageBucket: "tumba-99b8a.appspot.com",
    messagingSenderId: "9827195898",
    appId: "1:9827195898:web:0f56072061657ff8636243"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
