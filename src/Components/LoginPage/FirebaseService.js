import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../Firebase/FirebaseConnection";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

/**
 * Logs in a user with email and password.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @returns {Promise} - Resolves if login is successful, rejects otherwise.
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Query Firestore using email
    const staffQuery = query(
      collection(db, "staff"),
      where("email", "==", email) // Match the user's email
    );

    const querySnapshot = await getDocs(staffQuery);
    if (!querySnapshot.empty) {
      const staffData = querySnapshot.docs[0].data();
      return { uid: user.uid, email: user.email, ...staffData };
    } else {
      throw new Error("Staff data not found.");
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Sends a password reset email.
 * @param {string} email - User email.
 * @returns {Promise} - Resolves if email is sent successfully, rejects otherwise.
 */
export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      return "Password reset email sent.";
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
