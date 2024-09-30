// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase, onValue } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBsawB7pfSHEFoWmnpyjjPe0nAES3K1UY",
  authDomain: "codeissance-2024.firebaseapp.com",
  projectId: "codeissance-2024",
  storageBucket: "codeissance-2024.appspot.com",
  messagingSenderId: "11369272328",
  appId: "1:11369272328:web:b80b21ce33d91ce4b06dbd",
  measurementId: "G-8VPJQZNQT6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);
const realtimeDb = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export { db, storage, realtimeDb, onValue };
