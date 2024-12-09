import React, { useEffect, useState } from "react";
import "./Transaction.css";
import {
  Tabs,
  Table,
  message,
  Button,
  Spin,
  InputNumber,
  Modal,
  Select,
  Tooltip,
} from "antd";
import {
  ReadOutlined,
  RollbackOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { db } from "../Firebase/FirebaseConnection";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const Transaction = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [isFineModalVisible, setIsFineModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [fine, setFine] = useState(0);
  const [isClearModalVisible, setIsClearModalVisible] = useState(false);
  const [selectedBookForClear, setSelectedBookForClear] = useState(null);
  const [clearStatus, setClearStatus] = useState("");

  const fetchIssuedBook = async () => {
    try {
      const issuedBookRef = collection(db, "issuedBooks");
      const issuedBookSnapshot = await getDocs(issuedBookRef);
      const issuedData = issuedBookSnapshot.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));

      setIssuedBooks(issuedData);
    } catch (error) {
      console.error("Failed to fetch issued books:", error);
      message.error("Failed to load Issued Books.");
    }
  };

  const fetchReturnedBooks = async () => {
    try {
      const returnedBookRef = collection(db, "returnedBooks");
      const returnedBookSnapshot = await getDocs(returnedBookRef);
      const returnedData = returnedBookSnapshot.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));

      setReturnedBooks(returnedData);
    } catch (error) {
      console.error("Failed to fetch returned books:", error);
      message.error("Failed to load Returned Books.");
    }
  };

  const calculateRemainingDuration = (dueDate) => {
    if (!dueDate || !(dueDate instanceof Timestamp)) return "N/A";

    const dueDateObj = dueDate.toDate();
    const currentDate = new Date();

    const totalDaysDifference = Math.ceil(
      (dueDateObj.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
    );

    if (totalDaysDifference <= 0) {
      return "Overdue";
    }

    const months = Math.floor(totalDaysDifference / 30);
    const days = totalDaysDifference % 30;

    const monthStr =
      months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "";
    const dayStr = days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "";

    return `${monthStr}${monthStr && dayStr ? " & " : ""}${dayStr}`;
  };

  const damagedAndMissingBooks = issuedBooks.filter(
    (book) =>
      book.status === "Damaged" ||
      book.status === "Missing" ||
      book.status === "Resolved" ||
      book.status === "Paid"
  );

  const filteredIssuedBooks = issuedBooks.filter(
    (book) =>
      book.status !== "Damaged" &&
      book.status !== "Missing" &&
      book.status !== "Resolved" &&
      book.status !== "Paid"
  );

  const handleClearClick = (book) => {
    setSelectedBookForClear(book);
    setIsClearModalVisible(true);
  };

  const handleClearStatus = async () => {
    if (!clearStatus) {
      message.error("Please select a status.");
      return;
    }

    try {
      const bookRef = doc(db, "issuedBooks", selectedBookForClear.key);
      await updateDoc(bookRef, { status: clearStatus });

      const actionDescription = `Updated book "${selectedBookForClear.title}" to status "${clearStatus}"`;
      await logActivity(actionDescription);

      message.success(`Book marked as ${clearStatus} successfully!`);
      setIsClearModalVisible(false);
      setClearStatus("");
      setSelectedBookForClear(null);
      await fetchIssuedBook();
    } catch (error) {
      console.error("Error updating book status:", error);
      message.error("Failed to update the book status. Please try again.");
    }
  };

  const logActivity = async (bookTitle, oldStatus, newStatus, fineAmount) => {
    try {
      const userName = localStorage.getItem("userName");
      const logRef = collection(db, "user-activity-logs");

      const now = new Date();
      const formattedDateTime = now.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      await addDoc(logRef, {
        bookTitle: bookTitle,
        oldStatus: oldStatus,
        newStatus: newStatus,
        fineAmount: fineAmount,
        updatedBy: userName,
        timestamp: now,
        formattedDateTime,
      });

      console.log(
        `Activity logged: ${bookTitle} status changed from ${oldStatus} to ${newStatus} with a fine of ₱${fineAmount}.`
      );
    } catch (error) {
      console.error("Failed to log activity:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await fetchIssuedBook();
      await fetchReturnedBooks();
      setIsLoading(false);
    };

    fetchData();
    const interval = setInterval(() => {
      setIssuedBooks((prevBooks) =>
        prevBooks.map((book) => ({
          ...book,
          duration: calculateRemainingDuration(book.dueDate),
        }))
      );
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleReturnBook = async (book) => {
    setIsLoading(true);

    if (!book || !book.bookId) {
      message.error("Invalid book data");
      setIsLoading(false);
      return;
    }

    try {
      const actionDescription = `Returned book "${book.title}" borrowed by "${book.borrowedBy}"`;
      await logActivity(actionDescription);

      const issuedBookRef = collection(db, "issuedBooks");
      const issuedBookSnapshot = await getDocs(issuedBookRef);

      const bookDoc = issuedBookSnapshot.docs.find(
        (doc) => doc.data().bookId === book.bookId
      );

      if (!bookDoc) {
        message.error("Document not found for the given book ID.");
        setIsLoading(false);
        return;
      }

      const bookRef = doc(db, "issuedBooks", bookDoc.id);

      const returnedBookRef = collection(db, "returnedBooks");
      await addDoc(returnedBookRef, {
        ...book,
        returnedDate: new Date(),
        receivedBy: localStorage.getItem("userName"),
      });

      await deleteDoc(bookRef);
      console.log("Book deleted successfully from Firestore");
      const booksRef = collection(db, "books");
      const booksSnapshot = await getDocs(booksRef);
      const matchedBook = booksSnapshot.docs.find(
        (doc) => doc.id === book.bookId
      );

      if (matchedBook) {
        const matchedBookRef = doc(db, "books", matchedBook.id);
        const currentCopiesAvailable = parseInt(
          matchedBook.data().copiesAvailable
        );

        await updateDoc(matchedBookRef, {
          copiesAvailable: (currentCopiesAvailable + 1).toString(),
        });
      }

      setIssuedBooks((prevBooks) =>
        prevBooks.filter((issuedBook) => issuedBook.bookId !== book.bookId)
      );

      setReturnedBooks((prevBooks) => [
        ...prevBooks,
        {
          ...book,
          returnedDate: new Date(),
          receivedBy: localStorage.getItem("userName"),
        },
      ]);
      await fetchIssuedBook();
      await fetchReturnedBooks();
      message.success("Book successfully returned!");
    } catch (error) {
      console.error("Error during return:", error);
      message.error("Failed to return the book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusClick = (book) => {
    setSelectedBook(book);
    setNewStatus(book.status);
    setIsStatusModalVisible(true);
  };

  const handleStatusUpdate = () => {
    if (newStatus === "Damaged" || newStatus === "Missing") {
      setIsStatusModalVisible(false);
      setIsFineModalVisible(true);
    } else {
      updateBookStatus(newStatus, fine);
    }
  };

  const handleFineUpdate = () => {
    updateBookStatus(newStatus, fine);
  };

  const updateBookStatus = async (status, fineAmount) => {
    if (!selectedBook) return;

    try {
      const bookRef = doc(db, "issuedBooks", selectedBook.key);
      const oldStatus = selectedBook.status;
      await updateDoc(bookRef, { status, fine: fineAmount });
      await logActivity(selectedBook.title, oldStatus, status, fineAmount);

      message.success("Book status updated successfully!");
      setIsStatusModalVisible(false);
      setIsFineModalVisible(false);
      setSelectedBook(null);
      setFine(0);
      setNewStatus("");
      await fetchIssuedBook();
    } catch (error) {
      console.error("Error updating book status:", error);
      message.error("Failed to update book status. Please try again.");
    }
  };

  const borrowedColumns = [
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
      title: "Borrowed By",
      dataIndex: "borrowedBy",
      key: "borrowedBy",
    },
    {
      title: "Issued Date",
      dataIndex: "issuedAt",
      key: "issuedAt",
      render: (text) => {
        const dueDate = text?.toDate();
        return dueDate ? dueDate.toLocaleDateString() : "N/A";
      },
    },

    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => {
        const dueDate = text?.toDate();
        return dueDate ? dueDate.toLocaleDateString() : "N/A";
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text, record) => calculateRemainingDuration(record.dueDate),
    },

    {
      title: "Accommodated By",
      dataIndex: "accommodatedBy",
      key: "accommodatedBy",
    },
    {
      title: "Book Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        let tagColor;

        switch (status) {
          case "Fine":
            tagColor = "gold";
            break;
          case "Damaged":
            tagColor = "gold";
            break;
          case "Missing":
            tagColor = "gold";
            break;
          default:
            tagColor = "orange";
        }

        return (
          <Tooltip
            title="Missing or Damaged Book?"
            color={tagColor}
            key={tagColor}
            onClick={() => handleStatusClick(record)}
          >
            <Button className="status-btn">{status}</Button>
          </Tooltip>
        );
      },
    },
    {
      title: "Fine",
      dataIndex: "fine",
      key: "fine",
      render: (fine) => (fine > 0 ? `₱${fine}.00` : "--"),
    },

    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <span>
            <Button type="primary" onClick={() => handleReturnBook(record)}>
              Return Book
            </Button>
          </span>
        );
      },
    },
  ];

  const missingAndDamagedBook = [
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
      title: "Borrowed By",
      dataIndex: "borrowedBy",
      key: "borrowedBy",
    },
    {
      title: "Issued Date",
      dataIndex: "issuedAt",
      key: "issuedAt",
      render: (text) => {
        const dueDate = text?.toDate();
        return dueDate ? dueDate.toLocaleDateString() : "N/A";
      },
    },

    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => {
        const dueDate = text?.toDate();
        return dueDate ? dueDate.toLocaleDateString() : "N/A";
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text, record) => calculateRemainingDuration(record.dueDate),
    },

    {
      title: "Accommodated By",
      dataIndex: "accommodatedBy",
      key: "accommodatedBy",
    },
    {
      title: "Book Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        let tagColor;

        switch (status) {
          case "Fine":
            tagColor = "gold";
            break;
          case "Damaged":
            tagColor = "gold";
            break;
          case "Missing":
            tagColor = "gold";
            break;
          default:
            tagColor = "orange";
        }

        return (
          <Tooltip
            title="Change Book Status?"
            color={tagColor}
            key={tagColor}
            onClick={() => handleStatusClick(record)}
          >
            <Button className="status-btn">{status}</Button>
          </Tooltip>
        );
      },
    },
    {
      title: "Fine",
      dataIndex: "fine",
      key: "fine",
      render: (fine) => (fine > 0 ? `₱${fine}.00` : "--"),
    },

    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <span>
            <Button type="primary" onClick={() => handleClearClick(record)}>
              Clear
            </Button>
          </span>
        );
      },
    },
  ];

  const returnedColumns = [
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
      title: "Returned By",
      dataIndex: "borrowedBy",
      key: "borrowedBy",
    },
    {
      title: "Returned Date",
      dataIndex: "returnedDate",
      key: "returnedDate",
      render: (text) => {
        if (text instanceof Timestamp) {
          const returnedDate = text.toDate();
          return returnedDate ? returnedDate.toLocaleDateString() : "N/A";
        } else {
          return "N/A";
        }
      },
    },
    {
      title: "Received By",
      dataIndex: "receivedBy",
      key: "receivedBy",
    },
  ];

  return (
    <div className="tab-main-container">
      <h1>Issued & Returned Books</h1>
      <Tabs
        className="custom-tab"
        defaultActiveKey="1"
        tabBarStyle={{
          borderBottom: "1px solid #fff",
        }}
        items={[
          {
            key: "1",
            label: (
              <span className="custom-tab-label">
                <ReadOutlined /> Issued Book
              </span>
            ),
            children: (
              <Table
                className="custom-table"
                dataSource={filteredIssuedBooks}
                columns={borrowedColumns}
                pagination={{ pageSize: 5 }}
                locale={{
                  emptyText: isLoading ? (
                    <Spin tip="Loading Books..." />
                  ) : (
                    "No Data"
                  ),
                }}
              />
            ),
          },
          {
            key: "2",
            label: (
              <span className="custom-tab-label">
                <RollbackOutlined /> Returned Books
              </span>
            ),
            children: (
              <Table
                className="custom-table"
                dataSource={returnedBooks}
                columns={returnedColumns}
                pagination={{ pageSize: 5 }}
              />
            ),
          },
          {
            key: "3",
            label: (
              <span className="custom-tab-label">
                <WarningOutlined /> Damaged and Missing Book
              </span>
            ),
            children: (
              <Table
                className="custom-table"
                dataSource={damagedAndMissingBooks}
                columns={missingAndDamagedBook}
                pagination={{ pageSize: 5 }}
              />
            ),
          },
        ]}
      />

      <Modal
        className="custom-modal"
        title="Update Book Status"
        visible={isStatusModalVisible}
        onCancel={() => setIsStatusModalVisible(false)}
        onOk={handleStatusUpdate}
      >
        <p>Select the new status for the book:</p>
        <Select
          style={{ width: "100%" }}
          value={newStatus}
          onChange={(value) => setNewStatus(value)}
        >
          <Select.Option value="Fine">Fine</Select.Option>
          <Select.Option value="Damaged">Damaged</Select.Option>
          <Select.Option value="Missing">Missing</Select.Option>
        </Select>
      </Modal>
      <Modal
        className="custom-modal"
        title="Apply Fine"
        visible={isFineModalVisible}
        onCancel={() => setIsFineModalVisible(false)}
        onOk={handleFineUpdate}
      >
        <p>
          This book is marked as <strong>{newStatus}</strong>. Apply a fine if
          necessary:
        </p>
        <InputNumber
          style={{ width: "100%" }}
          value={fine}
          onChange={(value) => setFine(value)}
          min={0}
          step={1}
          placeholder="Enter fine amount"
        />
      </Modal>
      <Modal
        className="custom-modal"
        title="Clear Book Status"
        visible={isClearModalVisible}
        onCancel={() => setIsClearModalVisible(false)}
        onOk={handleClearStatus}
      >
        <p>Select the new status for this book:</p>
        <Select
          style={{ width: "100%" }}
          value={clearStatus}
          onChange={(value) => setClearStatus(value)}
        >
          <Select.Option value="Fine">Fine</Select.Option>
          <Select.Option value="Resolved">Resolved</Select.Option>
          <Select.Option value="Paid">Paid</Select.Option>
        </Select>
      </Modal>
    </div>
  );
};

export default Transaction;
