import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
// import moment from "moment";
import { Table } from "antd";

const Applied = () => {
  const [applied, setApplied] = useState([]);

  const getApplied = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-applied", {
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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorInfo.firstName} {record.doctorInfo.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    // },
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
  ];

  return (
    <Layout>
      <h1>Applied List</h1>
      <Table columns={columns} dataSource={applied} />
    </Layout>
  );
};

export default Applied;