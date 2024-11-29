import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { DatePicker } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import "./BookReport.css";

const BookReport = () => {
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const [totalBorrowed, setTotalBorrowed] = useState(1200);
  const [booksAvailable, setBooksAvailable] = useState(3800);
  const [returnedBooks, setReturnedBooks] = useState(900);

  const inventoryData = {
    series: [40, 30, 20, 5, 5],
    options: {
      chart: {
        type: "donut",
        toolbar: { show: false },
      },
      labels: ["College", "Senior High School", "Junior High School", "Elementary", "Pre-School"],
      colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      fill: {
        type: "gradient",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              name: { fontSize: "16px", color: "#2c3e50", offsetY: -10 },
              value: { fontSize: "20px", color: "#2c3e50", offsetY: 10 },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "14px",
          fontFamily: "Roboto",
        },
      },
    },
  };
  
  const conditionData = {
    series: [50, 40, 10],
    options: {
      chart: {
        type: "radialBar",
        toolbar: { show: false },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          stops: [0, 100],
        },
      },
      plotOptions: {
        radialBar: {
          hollow: { size: "65%" },
          track: { background: "#e0e0e0" },
          dataLabels: {
            showOn: "always",
            total: {
              show: true,
              label: "Total",
              formatter: () => "100%",
            },
          },
        },
      },
      labels: ["New", "Good", "Damaged"],
      colors: ["#4CAF50", "#FFC107", "#F44336"],
    },
  };

  const addedBooksData = {
    series: [
      {
        name: "Books Added",
        data: [20, 15, 30, 40, 25, 50, 60],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        animations: { enabled: true },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "60%",
          borderRadius: 6,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          stops: [0, 100],
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
      colors: ["#FFCE56"],
      grid: {
        show: true,
        borderColor: "#e8e8e8",
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  const overallBooksData = {
    series: [
      {
        name: "Books Count",
        data: [totalBorrowed, booksAvailable, returnedBooks],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        animations: { enabled: true },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%",
          borderRadius: 8,
        },
      },
      colors: ["#FF5733", "#33FF57", "#3357FF"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          stops: [0, 100],
        },
      },
      xaxis: {
        categories: ["Borrowed", "Available", "Returned"],
        labels: {
          style: {
            fontSize: "14px",
            fontFamily: "Roboto",
          },
        },
      },
      grid: {
        borderColor: "#e7e7e7",
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "14px",
          colors: ["#444"],
        },
      },
    },
  };

  const mostBorrowedBooksData = {
    series: [
      {
        name: "Borrowed Count",
        data: [120, 110, 100, 95, 90, 85, 80, 75, 70, 65],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 400,
        animations: { enabled: true },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%",
          borderRadius: 6,
        },
      },
      colors: ["#36A2EB"],
      fill: {
        type: "solid",
      },
      xaxis: {
        categories: [
          "Book A",
          "Book B",
          "Book C",
          "Book D",
          "Book E",
          "Book F",
          "Book G",
          "Book H",
          "Book I",
          "Book J",
        ],
        labels: {
          style: {
            fontSize: "12px",
            fontFamily: "Roboto",
            colors: ["#2c3e50"],
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "14px",
          fontFamily: "Roboto",
          colors: ["#2c3e50"],
        },
      },
      tooltip: {
        enabled: true,
        theme: "dark",
      },
    },
  };

  const lateReturnLevelsData = {
    series: [40, 30, 20, 5, 5],
    options: {
      chart: {
        type: "pie",
        height: 350,
        animations: { enabled: true },
      },
      labels: [
        "College",
        "Senior High School",
        "Junior High School",
        "Elementary",
        "Pre-School",
      ],
      colors: ["#FF5733", "#FF8D1A", "#FFC300", "#DAF7A6", "#C70039"],
      fill: {
        type: "gradient",
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}%`,
        style: {
          fontSize: "14px",
          fontFamily: "Roboto",
          colors: ["#2c3e50"],
        },
      },
      legend: {
        position: "bottom",
        labels: {
          colors: "#2c3e50",
          useSeriesColors: false,
        },
      },
    },
  };

  const earlyReturnLevelsData = {
    series: [30, 35, 20, 10, 5],
    options: {
      chart: {
        type: "pie",
        height: 350,
        animations: { enabled: true },
      },
      labels: [
        "Elementary",
        "Junior High School",
        "Senior High School",
        "College",
        "Pre-School",
      ],
      colors: ["#28A745", "#17A2B8", "#FFC107", "#DC3545", "#6C757D"],
      fill: {
        type: "gradient",
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}%`,
        style: {
          fontSize: "14px",
          fontFamily: "Roboto",
          colors: ["#2c3e50"],
        },
      },
      legend: {
        position: "right",
        labels: {
          colors: "#2c3e50",
          useSeriesColors: false,
        },
      },
    },
  };

  return (
    <div className="report-container">
      <h2>Book Reports Overview</h2>

      <div className="date-range-container">
        <h4>Select Date Range:</h4>
        <DatePicker.RangePicker
          value={dateRange}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          allowClear
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            fontSize: "16px",
          }}
          dropdownStyle={{ padding: "10px" }}
        />
      </div>

      <div className="summary-container">
        <div className="stat-card">
          <h3>Total Borrowed Books</h3>
          <p>{totalBorrowed}</p>
        </div>
        <div className="stat-card">
          <h3>Books Available</h3>
          <p>{booksAvailable}</p>
        </div>
        <div className="stat-card">
          <h3>Returned Books</h3>
          <p>{returnedBooks}</p>
        </div>
      </div>

      <div className="chart-wrapper">
        <div className="chart-container">
          <h3>Overall Book Statistics</h3>
          <ReactApexChart
            options={overallBooksData.options}
            series={overallBooksData.series}
            type="bar"
            height={350}
          />
        </div>
        <div className="chart-container">
          <h3>Book Inventory Breakdown (Donut)</h3>
          <ReactApexChart
            options={inventoryData.options}
            series={inventoryData.series}
            type="donut"
            height={350}
          />
        </div>
        <div className="chart-container">
          <h3>Book Condition Breakdown (Radial Bar)</h3>
          <ReactApexChart
            options={conditionData.options}
            series={conditionData.series}
            type="radialBar"
            height={350}
          />
        </div>
        <div className="chart-container">
          <h3>Books Added Over Time (Bar)</h3>
          <ReactApexChart
            options={addedBooksData.options}
            series={addedBooksData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>

      <div className="chart-wrapper">
        <div className="chart-container">
          <h3>Top 10 Most Borrowed Books</h3>
          <ReactApexChart
            options={mostBorrowedBooksData.options}
            series={mostBorrowedBooksData.series}
            type="bar"
            height={400}
          />
        </div>
        <div className="chart-container">
          <h3>Levels with Most Late Returns</h3>
          <ReactApexChart
            options={lateReturnLevelsData.options}
            series={lateReturnLevelsData.series}
            type="pie"
            height={350}
          />
        </div>
        <div className="chart-container">
          <h3>Levels with Most Early Returns</h3>
          <ReactApexChart
            options={earlyReturnLevelsData.options}
            series={earlyReturnLevelsData.series}
            type="pie"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default BookReport;
