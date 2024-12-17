import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Modal,
  Form,
  Input,
  Button,
  Spin,
  Popconfirm,
  message,
  Tag,
  Descriptions,
  Row,
  Col,
} from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { fetchBooks, deleteBook, updateBook } from "./BookService";
import "./Table.css";
import TextArea from "antd/es/input/TextArea";

const AntTable = ({ setRefreshBooks }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const booksData = await fetchBooks();
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setRefreshBooks(() => fetchData);
  }, [setRefreshBooks]);

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
      title: "Copies Available",
      dataIndex: "copiesAvailable",
      key: "copiesAvailable",
    },
    {
      title: "Shelf Location",
      dataIndex: "shelfLocation",
      key: "shelfLocation",
      render: (shelfNumber) => (
        <Tag className="transparent-tag" key={shelfNumber}>
          {shelfNumber}
        </Tag>
      ),
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
            onClick={() => handleEditBook(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this book?"
            onConfirm={() => handleDeleteBook(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={<DeleteOutlined className="action-icon" />}
            />
          </Popconfirm>
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

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsEditModalVisible(true);
    form.setFieldsValue(book);
  };

  const handleSaveEdit = async () => {
    if (!editingBook) return;

    try {
      await updateBook(editingBook.key, {
        title: editingBook.title,
        author: editingBook.author,
        category: editingBook.category,
        copiesAvailable: editingBook.copiesAvailable,
        shelfLocation: editingBook.shelfLocation,
      });

      message.success("Book updated successfully!");
      setIsEditModalVisible(false);
      setEditingBook(null);
      fetchData();
    } catch (error) {
      message.error("Failed to update the book. Please try again.");
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      setBooks(books.filter((book) => book.key !== bookId));
      message.success("Book Deleted Successfully");
      fetchData();
    } catch (error) {
      message.error("Delete Failed, Please Try Again");
    }
  };

  return (
    <>
      <Table
        className="custom-table"
        columns={columns}
        dataSource={books}
        pagination={{ pageSize: 5 }}
        locale={{
          emptyText: isLoading ? <Spin tip="Loading Books..." /> : "No Data",
        }}
      />

      <Modal
        className="custom-modal"
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
            <Descriptions.Item label="Copies Available">
              {selectedBook.copiesAvailable}
            </Descriptions.Item>
            <Descriptions.Item label="Total Copies">
              {selectedBook.totalCopies}
            </Descriptions.Item>
            <Descriptions.Item label="Shelf Location">
              {selectedBook.shelfLocation}
            </Descriptions.Item>
            <Descriptions.Item label="Book Description">
              {selectedBook.bookDescription}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        className="custom-modal"
        title="Edit Book"
        visible={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setEditingBook(null);
          form.resetFields();
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>,
        ]}
      >
        {editingBook && (
          <Form
            className="custom-form"
            form={form}
            layout="vertical"
            initialValues={editingBook}
            onValuesChange={(changedValues, allValues) => {
              setEditingBook({ ...editingBook, ...changedValues });
            }}
          >
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Author" name="author">
              <Input />
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Input />
            </Form.Item>
            <Form.Item label="ISBN" name="isbn">
              <Input />
            </Form.Item>

            <Form.Item label="Publisher" name="publisher">
              <Input />
            </Form.Item>

            <Form.Item label="Total Copies" name="totalCopies">
              <Input />
            </Form.Item>

            <Form.Item label="Year" name="year">
              <Input />
            </Form.Item>

            <Form.Item label="Copies Available" name="copiesAvailable">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Shelf Location" name="shelfLocation">
              <Input />
            </Form.Item>
            <Form.Item label="Book Description" name="bookDescription">
              <TextArea />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default AntTable;
