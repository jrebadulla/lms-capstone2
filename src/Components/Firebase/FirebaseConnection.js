import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2jrar6DQCT3xDzng_ufAkKFI0f9jb430",
  authDomain: "lms-capstone2.firebaseapp.com",
  projectId: "lms-capstone2",
  storageBucket: "lms-capstone2.appspot.com",
  messagingSenderId: "701622407702",
  appId: "1:701622407702:web:be3629e7ff3c4cb95c5b37",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
