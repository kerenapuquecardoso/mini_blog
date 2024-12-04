import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAHSQ8WKPk26v-RmpF03RBlz2dAxC7S-1g",
  authDomain: "miniblog-4e602.firebaseapp.com",
  projectId: "miniblog-4e602",
  storageBucket: "miniblog-4e602.firebasestorage.app",
  messagingSenderId: "67655232334",
  appId: "1:67655232334:web:c6f26200bba9b431f40c1f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db, auth };