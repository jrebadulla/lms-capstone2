import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Descriptions, Button } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { fetchBooks, deleteBook } from "./BookService"; 
import './Table.css'

const AntTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]); // State to hold the books

  useEffect(() => {
    // Fetch books when the component mounts
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    getBooks();
  }, []); // Empty dependency array to run once when the component mounts

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined className="action-icon" />}
            onClick={() => handleViewDetails(record)}
          />
          <Button
            type="link"
            icon={<EditOutlined className="action-icon" />}
            onClick={() => handleViewDetails(record)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined className="action-icon" />}
            onClick={() => handleDeleteBook(record.key)} // Pass the book key (ID)
          />
        </Space>
      ),
    },
  ];

  const handleViewDetails = (record) => {
    setSelectedBook(record);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedBook(null);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      setBooks(books.filter((book) => book.key !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      <Table
        className="custom-table"
        columns={columns}
        dataSource={books}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Book Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        {selectedBook && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Title">
              {selectedBook.title}
            </Descriptions.Item>
            <Descriptions.Item label="Author">
              {selectedBook.author}
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {selectedBook.category}
            </Descriptions.Item>
            <Descriptions.Item label="ISBN">
              {selectedBook.isbn}
            </Descriptions.Item>
            <Descriptions.Item label="Publisher">
              {selectedBook.publisher}
            </Descriptions.Item>
            <Descriptions.Item label="Year">
              {selectedBook.year}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {selectedBook.status}
            </Descriptions.Item>
            <Descriptions.Item label="Copies Available">
              {selectedBook.copiesAvailable}
            </Descriptions.Item>
            <Descriptions.Item label="Total Copies">
              {selectedBook.totalCopies}
            </Descriptions.Item>
            <Descriptions.Item label="Shelf Location">
              {selectedBook.shelfLocation}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default AntTable;
