import React from "react";
import "./BookShelves.css";

const BookShelves = () => {
  const shelves = [
    {
      shelfNumber: 1,
      books: [
        { title: "Book 1", available: true },
        { title: "Book 2", available: false },
        { title: "Book 3", available: true },
        { title: "Book 4", available: false },
        { title: "Book 5", available: true },
      ],
    },
    {
      shelfNumber: 2,
      books: [
        { title: "Book 6", available: true },
        { title: "Book 7", available: false },
        { title: "Book 8", available: true },
        { title: "Book 9", available: true },
        { title: "Book 10", available: false },
      ],
    },
    {
      shelfNumber: 3,
      books: [
        { title: "Book 11", available: false },
        { title: "Book 12", available: true },
        { title: "Book 13", available: true },
        { title: "Book 14", available: false },
        { title: "Book 15", available: true },
      ],
    },
    {
      shelfNumber: 4,
      books: [
        { title: "Book 16", available: false },
        { title: "Book 17", available: true },
        { title: "Book 18", available: true },
        { title: "Book 19", available: false },
        { title: "Book 20", available: true },
      ],
    },
  ];

  return (
    <div className="book-shelf-main-container">
      <div className="bookshelf-container">
        {shelves.map((shelf, index) => (
          <div key={index} className="shelf">
            <h3 className="shelf-number">Shelf {shelf.shelfNumber}</h3>
            <div className="books">
              {shelf.books.map((book, bookIndex) => (
                <div
                  key={bookIndex}
                  className={`book ${book.available ? "available" : "unavailable"}`}
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
