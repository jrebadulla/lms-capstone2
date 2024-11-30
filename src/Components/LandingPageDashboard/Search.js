import React, { useState } from "react";
import "./Search.css";
import { Input, Modal, Form, Button, Input as AntInput } from "antd";
import { addBook } from "./BookService";

const Search = () => {
  const { Search } = Input;
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddBook = async (values) => {
    try {
      const bookData = {
        title: values.title,
        author: values.author,
        year: values.year,
        category: values.category,
        isbn: values.isbn,
        publisher: values.publisher,
        status: values.status,
        copiesAvailable: values.copiesAvailable,
        totalCopies: values.totalCopies,
        shelfLocation: values.shelfLocation,
      };

      const newBookId = await addBook(bookData);

      form.resetFields();
      setIsAddModalVisible(false);

      console.log("New Book ID:", newBookId);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="search-main-container">
      <div className="add-btn">
        <button type="button" className="button" onClick={showAddModal}>
          <span className="button__text">Add New Book</span>
          <span className="button__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
              height="24"
              fill="none"
              className="svg"
            >
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg>
          </span>
        </button>
      </div>

      <div className="search-container">
        <Search
          className="custom-search"
          placeholder="Search book here..."
          allowClear
          enterButton="Search"
          size="large"
        />
      </div>

      <Modal
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
              { required: true, message: "Please input the author's name!" },
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
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please input the status!" }]}
          >
            <AntInput />
          </Form.Item>

          <Form.Item
            name="copiesAvailable"
            label="Copies Available"
            rules={[
              { required: true, message: "Please input the available copies!" },
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
            label="Shelf Location"
            rules={[
              { required: true, message: "Please input the shelf location!" },
            ]}
          >
            <AntInput />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Add Book
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Search;
