import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { db } from "../Firebase/FirebaseConnection";
import { collection, getDocs } from "firebase/firestore";
import "./BookShelves.css";

const BookShelves = () => {
  const { Search } = Input;
  const [shelves, setShelves] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const booksSnapshot = await getDocs(booksCollection);
      const booksData = booksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        copiesAvailable: parseInt(doc.data().copiesAvailable, 10) || 0,
      }));

      // Organize books into shelves
      const shelvesData = booksData.reduce((acc, book) => {
        const { shelfLocation, title, copiesAvailable } = book;
        const index = acc.findIndex(
          (shelf) => shelf.shelfLocation === shelfLocation
        );
        if (index > -1) {
          acc[index].books.push({ title, copiesAvailable });
        } else {
          acc.push({ shelfLocation, books: [{ title, copiesAvailable }] });
        }
        return acc;
      }, []);

      setShelves(shelvesData);
    };

    fetchBooks();
  }, []);

  const getShelfName = (number) => {
    const names = [
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
    ];
    return `Shelf ${names[number - 1]}`; // Adjust this if you expect shelf numbers greater than 10
  };

  // Filter shelves based on search query
  const filteredShelves = shelves.map((shelf) => ({
    ...shelf,
    books: shelf.books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <div className="book-shelf-main-container">
      <div className="bookshelf-container">
        <Search
          placeholder="Search book here"
          allowClear
          enterButton="Search"
          size="large"
          className="custom-search"
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        {filteredShelves
          .filter((shelf) => shelf.books.length > 0) // Show shelves with books only
          .sort((a, b) => a.shelfLocation - b.shelfLocation)
          .map((shelf, index) => (
            <div key={index} className="shelf">
              <h3 className="shelf-number">
                {getShelfName(shelf.shelfLocation)}
              </h3>
              <div className="books">
                {shelf.books.map((book, bookIndex) => (
                  <div
                    key={bookIndex}
                    className={`book ${
                      book.copiesAvailable > 0 ? "available" : "unavailable"
                    }`}
                    title={book.title}
                  >
                    {book.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookShelves;
