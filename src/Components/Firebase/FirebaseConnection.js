import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD2jrar6DQCT3xDzng_ufAkKFI0f9jb430",
  authDomain: "lms-capstone2.firebaseapp.com",
  projectId: "lms-capstone2",
  storageBucket: "lms-capstone2.firebasestorage.app",
  messagingSenderId: "701622407702",
  appId: "1:701622407702:web:be3629e7ff3c4cb95c5b37",
  measurementId: "G-TM6PWXRXQB",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const analytics = getAnalytics(app);

export { auth };
