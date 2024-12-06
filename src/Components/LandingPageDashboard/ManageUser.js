import React, { useState, useEffect } from "react";
import "./ManageUser.css";
import {
  Input,
  Table,
  Modal,
  Form,
  Select,
  Button,
  Avatar,
  message,
  Space,
  Popconfirm,
  Descriptions,
  Spin,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { db } from "../Firebase/FirebaseConnection.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const ManageUser = () => {
  const { Search } = Input;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewStaff, setViewStaff] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setViewStaff(null);
    setEditingStaff(null);
  };

  const fetchStaffData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "staff"));
      const staffData = querySnapshot.docs.map((doc, index) => ({
        key: doc.id,
        index,
        ...doc.data(),
      }));
      setStaffList(staffData);
    } catch (error) {
      message.error("Error fetching staff data: " + error.message);
    }
    setLoading(false);
  };

  const handleAddStaff = async (values) => {
    const libraryCardNumber = `LIB-${uuidv4().slice(0, 8).toUpperCase()}`;

    const newStaff = {
      ...values,
      libraryCardNumber,
    };

    try {
      await addDoc(collection(db, "staff"), newStaff);
      message.success("Staff added successfully!");
      handleCancel();
      fetchStaffData();
    } catch (error) {
      message.error("Error adding staff: " + error.message);
    }
  };

  const handleEditStaff = async (values) => {
    try {
      const staffRef = doc(db, "staff", editingStaff.key);
      await updateDoc(staffRef, values);
      message.success("Staff updated successfully!");
      handleCancel();
      fetchStaffData();
    } catch (error) {
      message.error("Error editing staff: " + error.message);
    }
  };

  const handleDeleteStaff = async (key) => {
    try {
      await deleteDoc(doc(db, "staff", key));
      message.success("Staff deleted successfully!");
      fetchStaffData();
    } catch (error) {
      message.error("Error deleting staff: " + error.message);
    }
  };

  const handleViewDetails = (record) => {
    setViewStaff(record);
    setIsModalVisible(true);
  };

  const handleEditClick = (record) => {
    setEditingStaff(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  const columns = [
    {
      title: "Avatar",
      key: "avatar",

      render: (_, record) => (
        <Avatar
          className="custom-avatar"
          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${record.index}`}
        />
      ),
    },
    {
      title: "Library Card Number",
      dataIndex: "libraryCardNumber",
      key: "libraryCardNumber",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag
          className="custom-tag"
          bordered={false}
          color={status === "Active" ? "green" : "orange"}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
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
            onClick={() => handleEditClick(record)}
          ></Button>
          <Popconfirm
            title="Are you sure you want to delete this staff?"
            onConfirm={() => handleDeleteStaff(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={<DeleteOutlined className="action-icon" />}
            ></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="manage-user-container">
      <div className="search-main-container">
        <div className="add-btn">
          <button type="button" className="button" onClick={showModal}>
            <PlusCircleOutlined className="add-icon" />
            <span className="button__text">Add New Staff</span>
          </button>
        </div>

        <div className="search-container">
          <Search
            className="custom-search"
            placeholder="Search staff here..."
            allowClear
            enterButton="Search"
            size="large"
          />
        </div>
      </div>

      <Table
        className="custom-table"
        columns={columns}
        dataSource={staffList}
        pagination={{ pageSize: 5 }}
        locale={{
          emptyText: loading ? <Spin tip="Loading Staff..." /> : "No Data",
        }}
        size="middle"
      />

      <Modal
        className="custom-modal"
        title="Staff Details"
        visible={isModalVisible && !editingStaff}
        onCancel={handleCancel}
        footer={null}
      >
        {viewStaff && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Full Name">
              {viewStaff.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {" "}
              {viewStaff.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              {viewStaff.number}
            </Descriptions.Item>
            <Descriptions.Item label="Staff ID Number">
              {viewStaff.staffId}
            </Descriptions.Item>
            <Descriptions.Item label="Year Level">
              {viewStaff.yearLevel}
            </Descriptions.Item>
            <Descriptions.Item label="Designation">
              {viewStaff.designation}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {" "}
              {viewStaff.status}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {" "}
              {viewStaff.gender}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        className="custom-modal"
        title={editingStaff ? "Edit Staff" : "Add New Staff"}
        visible={isModalVisible && !viewStaff}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={editingStaff ? handleEditStaff : handleAddStaff}
          initialValues={editingStaff ? editingStaff : {}}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input the staff's name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input the staff's email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="number"
            rules={[
              {
                required: true,
                message: "Please input the staff's phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Staff ID"
            name="staffId"
            rules={[
              { required: true, message: "Please input the staff's ID!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Year Level"
            name="yearLevel"
            rules={[
              { required: true, message: "Please select the year level!" },
            ]}
          >
            <Select>
              <Select.Option value="1">Year 1</Select.Option>
              <Select.Option value="2">Year 2</Select.Option>
              <Select.Option value="3">Year 3</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Designation"
            name="designation"
            rules={[
              { required: true, message: "Please select the designation!" },
            ]}
          >
            <Select>
              <Select.Option value="Librarian">Librarian</Select.Option>
              <Select.Option value="Assistant">Assistant</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select the gender!" }]}
          >
            <Select>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <div className="modal-footer">
            <Button onClick={handleCancel} className="cancel-btn">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="save-btn">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUser;
