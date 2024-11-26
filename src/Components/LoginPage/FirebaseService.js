import { auth } from "../Firebase/FirebaseConnection";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

/**
 * Logs in a user with email and password.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @returns {Promise} - Resolves if login is successful, rejects otherwise.
 */
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
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
