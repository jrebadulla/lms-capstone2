import { React, useState } from "react";
import "./ManageBook.css";
import AntTable from "./Table";
import Loading from "./Loading";
import QRCode from "qrcode.react";

import {
  Modal,
  Form,
  Button,
  Input as AntInput,
  message,
  Row,
  Col,
} from "antd";
import { addBook } from "./BookService";
import TextArea from "antd/es/input/TextArea";
import SearchBar from "./Search";

const ManageBook = () => {
  const [isLoading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [refreshBooks, setRefreshBooks] = useState(() => () => {});

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddBook = async (values) => {
    setIsAddModalVisible(false);
    setLoading(true);
    try {
      const bookData = {
        title: values.title,
        author: values.author,
        year: values.year,
        category: values.category,
        isbn: values.isbn,
        publisher: values.publisher,
        copiesAvailable: values.copiesAvailable,
        totalCopies: values.totalCopies,
        shelfLocation: values.shelfLocation,
        bookDescription: values.bookDescription,
      };

      const newBookId = await addBook(bookData);
      console.log("New Book ID:", newBookId);
      message.success("Book added successfully!");
      refreshBooks();
    } catch (error) {
      console.error("Error adding book:", error);
      message.error("Failed to add book. Please try again.");
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <div className="manageBook-main-container">
      <div className="table-container">
        <SearchBar onClick={showAddModal} />
        {isLoading && (
          <div className="loading-overlay">
            <Loading />
          </div>
        )}

        <AntTable setRefreshBooks={setRefreshBooks} />
      </div>

      <Modal
        className="custom-modal"
        title="Add New Book"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddBook}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input the book title!" },
            ]}
          >
            <AntInput />
          </Form.Item>

          <Form.Item
            name="author"
            label="Author"
            rules={[
              {
                required: true,
                message: "Please input the author's name!",
              },
            ]}
          >
            <AntInput />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please input the category!" }]}
          >
            <AntInput />
          </Form.Item>

          <Form.Item
            name="isbn"
            label="ISBN"
            rules={[{ required: true, message: "Please input the ISBN!" }]}
          >
            <AntInput />
          </Form.Item>

          <Form.Item
            name="publisher"
            label="Publisher"
            rules={[{ required: true, message: "Please input the publisher!" }]}
          >
            <AntInput />
          </Form.Item>

          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true, message: "Please input the year!" }]}
          >
            <AntInput />
          </Form.Item>

          <Form.Item
            name="copiesAvailable"
            label="Copies Available"
            rules={[
              {
                required: true,
                message: "Please input the available copies!",
              },
            ]}
          >
            <AntInput type="number" />
          </Form.Item>

          <Form.Item
            name="totalCopies"
            label="Total Copies"
            rules={[
              { required: true, message: "Please input the total copies!" },
            ]}
          >
            <AntInput type="number" />
          </Form.Item>

          <Form.Item
            name="shelfLocation"
            label="Shelf Number"
            rules={[
              {
                required: true,
                message: "Please input the shelf Number!",
              },
            ]}
          >
            <AntInput type="number" />
          </Form.Item>

          <Form.Item
            name="bookDescription"
            label="Book Description"
            rules={[
              {
                required: true,
                message: "Please input the book description!",
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Add Book
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBook;
