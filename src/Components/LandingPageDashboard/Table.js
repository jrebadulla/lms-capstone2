import React, { useState } from "react";
import "./Table.css";
import { Table, Space, Modal, Descriptions, Button } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const AntTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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
          ></Button>
          <Button
            type="link"
            icon={<EditOutlined className="action-icon" />}
            onClick={() => handleViewDetails(record)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined className="action-icon" />}
            onClick={() => handleViewDetails(record)}
          ></Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Fiction",
      isbn: "9780060935467",
      publisher: "J.B. Lippincott & Co.",
      year: 1960,
      status: "Available",
      copiesAvailable: 4,
      totalCopies: 10,
      shelfLocation: "Aisle 2 - Shelf 3",
    },
    {
      key: "2",
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      category: "History",
      isbn: "9780062316097",
      publisher: "Harper",
      year: 2011,
      status: "Borrowed",
      copiesAvailable: 0,
      totalCopies: 5,
      shelfLocation: "Aisle 5 - Shelf 1",
    },
    {
      key: "3",
      title: "1984",
      author: "George Orwell",
      category: "Dystopian",
      isbn: "9780451524935",
      publisher: "Secker & Warburg",
      year: 1949,
      status: "Available",
      copiesAvailable: 3,
      totalCopies: 8,
      shelfLocation: "Aisle 1 - Shelf 4",
    },
    {
      key: "4",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Classics",
      isbn: "9780743273565",
      publisher: "Charles Scribner's Sons",
      year: 1925,
      status: "Borrowed",
      copiesAvailable: 0,
      totalCopies: 7,
      shelfLocation: "Aisle 3 - Shelf 2",
    },
    {
      key: "5",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      category: "Classics",
      isbn: "9780316769488",
      publisher: "Little, Brown and Company",
      year: 1951,
      status: "Available",
      copiesAvailable: 2,
      totalCopies: 6,
      shelfLocation: "Aisle 4 - Shelf 5",
    },
    {
      key: "6",
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      category: "Fantasy",
      isbn: "9780439708180",
      publisher: "Scholastic",
      year: 1997,
      status: "Borrowed",
      copiesAvailable: 0,
      totalCopies: 20,
      shelfLocation: "Aisle 6 - Shelf 1",
    },
    {
      key: "7",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      category: "Romance",
      isbn: "9781503290563",
      publisher: "T. Egerton",
      year: 1813,
      status: "Available",
      copiesAvailable: 5,
      totalCopies: 9,
      shelfLocation: "Aisle 2 - Shelf 1",
    },
    {
      key: "8",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      category: "Fantasy",
      isbn: "9780547928227",
      publisher: "George Allen & Unwin",
      year: 1937,
      status: "Available",
      copiesAvailable: 7,
      totalCopies: 10,
      shelfLocation: "Aisle 7 - Shelf 3",
    },
    {
      key: "9",
      title: "Becoming",
      author: "Michelle Obama",
      category: "Biography",
      isbn: "9781524763138",
      publisher: "Crown Publishing Group",
      year: 2018,
      status: "Borrowed",
      copiesAvailable: 0,
      totalCopies: 4,
      shelfLocation: "Aisle 9 - Shelf 2",
    },
    {
      key: "10",
      title: "The Alchemist",
      author: "Paulo Coelho",
      category: "Philosophy",
      isbn: "9780061122415",
      publisher: "HarperOne",
      year: 1988,
      status: "Available",
      copiesAvailable: 6,
      totalCopies: 12,
      shelfLocation: "Aisle 8 - Shelf 4",
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

  return (
    <>
      <Table
        className="custom-table"
        columns={columns}
        dataSource={data}
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
