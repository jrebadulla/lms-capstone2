import React, { useState, useEffect } from "react";
import "./AuditTrail.css";
import { Avatar, List, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConnection";

const { RangePicker } = DatePicker;

const AuditTrail = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "user-activity-logs"),
      (snapshot) => {
        const auditData = snapshot.docs.map((doc) => {
          const record = doc.data();
          return {
            title: `Book Status Changed: '${record.bookTitle}'`,
            description: `Action performed by: ${record.updatedBy} | Old Status: ${record.oldStatus} | New Status: ${record.newStatus} | Fine Amount: ${record.fineAmount}`,
            date: record.timestamp ? record.timestamp.toDate() : null,
            avatarSeed: record.avatarSeed || record.updatedBy || "default-avatar", // Use avatarSeed or fallback
          };
        });
        setData(auditData);
        setFilteredData(auditData);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFilter = () => {
    if (dateRange.length === 2) {
      const [start, end] = dateRange;
      const filtered = data.filter((item) => {
        if (!item.date) return false;
        const itemDate = dayjs(item.date);
        return (
          itemDate.isAfter(dayjs(start).subtract(1, "day")) &&
          itemDate.isBefore(dayjs(end).add(1, "day"))
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div className="audit-trail-main-container">
      <div className="filter-container">
        <RangePicker onChange={(dates) => setDateRange(dates)} />
        <Button
          type="primary"
          onClick={handleFilter}
          style={{ marginLeft: "10px" }}
        >
          Filter
        </Button>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={filteredData}
        renderItem={(item) => (
          <List.Item className="custom-list-item">
            <List.Item.Meta
              avatar={
                <Avatar
                  className="custom-avatar"
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.avatarSeed}`}
                />
              }
              title={<span className="list-item-title">{item.title}</span>}
              description={
                <span className="list-item-description">
                  {item.description} | Date:{" "}
                  {item.date
                    ? dayjs(item.date).format("MMMM D, YYYY h:mm A")
                    : "Date Not Available"}
                </span>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default AuditTrail;
