import { db } from "../Firebase/FirebaseConnection";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const booksCollectionRef = collection(db, "books");

export const fetchBooks = async () => {
  try {
    const booksSnapshot = await getDocs(booksCollectionRef);
    const booksList = booksSnapshot.docs.map((doc) => ({
      ...doc.data(),
      key: doc.id,
    }));
    return booksList;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const addBook = async (bookData) => {
  try {
    const docRef = await addDoc(booksCollectionRef, bookData);
    console.log("Book added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding book:", error);
    throw new Error("Error adding book: " + error.message);
  }
};

export const updateBook = async (bookId, updatedData) => {
  const bookDocRef = doc(db, "books", bookId);
  try {
    await updateDoc(bookDocRef, updatedData);
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (bookId) => {
  const bookDocRef = doc(db, "books", bookId);
  try {
    await deleteDoc(bookDocRef);
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
