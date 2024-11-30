import React, { useState } from "react";
import "./AuditTrail.css";
import { Avatar, List, DatePicker, Button } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const AuditTrail = () => {
  const allData = [
    {
      title: "User added a new book: 'The Great Gatsby'",
      description: "Action performed by: John Doe | Date: 2024-11-01 10:30 AM",
      date: "2024-11-01",
    },
    {
      title: "User edited book details: '1984'",
      description:
        "Action performed by: Jane Smith | Date: 2024-11-02 02:15 PM",
      date: "2024-11-02",
    },
    {
      title: "User deleted a book: 'To Kill a Mockingbird'",
      description:
        "Action performed by: Emily Johnson | Date: 2024-11-03 05:45 PM",
      date: "2024-11-03",
    },
    {
      title: "User added a new book: 'Pride and Prejudice'",
      description:
        "Action performed by: Michael Brown | Date: 2024-11-04 09:20 AM",
      date: "2024-11-04",
    },
    {
      title: "User edited book details: 'Moby Dick'",
      description:
        "Action performed by: Sarah Davis | Date: 2024-11-05 11:10 AM",
      date: "2024-11-05",
    },
    {
      title: "User added a new book: 'War and Peace'",
      description:
        "Action performed by: Chris Wilson | Date: 2024-11-06 04:00 PM",
      date: "2024-11-06",
    },
    {
      title: "User deleted a book: 'The Catcher in the Rye'",
      description:
        "Action performed by: Olivia Martinez | Date: 2024-11-07 06:25 PM",
      date: "2024-11-07",
    },
    {
      title: "User edited book details: 'Brave New World'",
      description:
        "Action performed by: Daniel Lee | Date: 2024-11-08 01:50 PM",
      date: "2024-11-08",
    },
    {
      title: "User added a new book: 'The Hobbit'",
      description:
        "Action performed by: Sophia Garcia | Date: 2024-11-09 08:40 AM",
      date: "2024-11-09",
    },
    {
      title: "User deleted a book: 'Jane Eyre'",
      description:
        "Action performed by: Liam Thompson | Date: 2024-11-10 03:30 PM",
      date: "2024-11-10",
    },
  ];

  const [data, setData] = useState(allData);
  const [dateRange, setDateRange] = useState([]);

  const handleFilter = () => {
    if (dateRange.length === 2) {
      const [start, end] = dateRange;
      const filteredData = allData.filter((item) => {
        const itemDate = dayjs(item.date);
        return (
          itemDate.isAfter(dayjs(start).subtract(1, "day")) &&
          itemDate.isBefore(dayjs(end).add(1, "day"))
        );
      });
      setData(filteredData);
    } else {
      setData(allData); // Reset if no date range is selected
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
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<span className="list-item-title">{item.title}</span>}
              description={
                <span className="list-item-description">
                  {item.description}
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
