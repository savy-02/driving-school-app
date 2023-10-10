import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";

import axios from "axios";

// import moment from "moment";
import { message, Table } from "antd";

const DriverApplied = () => {
  const [applied, setApplied] = useState([]);

  const getApplied = async () => {
    try {
      const res = await axios.get("/api/v1/driver//driver-applied", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setApplied(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplied();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/driver/update-status",
        { appliedId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getApplied();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //   title: "Date & Time",
    //   dataIndex: "date",
    //   render: (text, record) => (
    //     <span>
    //       {moment(record.date).format("DD-MM-YYYY")} &nbsp;
    //       {moment(record.time).format("HH:mm")}
    //     </span>
    //   ),
    // },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>Applied Lists</h1>
      <Table columns={columns} dataSource={applied} />
    </Layout>
  );
};

export default DriverApplied;