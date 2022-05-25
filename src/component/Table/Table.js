import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import Chip from "@mui/material/Chip";

const baseURL = "http://127.0.0.1:8000/";

// const [name, setName] = useState("sdfdsf");

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    // render: (id) => (
    //   <a href={baseURL + "application-detail/" + id.toString()}>{id}</a>
    // ),
    responsive: ["sm"],
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // render: (name) => <a href={baseURL + "application-detail/"}>{name}</a>,
    responsive: ["sm"],
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    responsive: ["sm"],
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    responsive: ["sm"],
  },
  {
    title: "View Application",
    dataIndex: "id",
    key: "id",
    render: (id) => (
      <a href={baseURL + "application-detail/" + id.toString()}>
        <Chip label="View" color="primary" clickable />
      </a>
    ),
    responsive: ["sm"],
  },
  // {
  //   title: "Linkedin",
  //   dataIndex: "linkedin",
  //   key: "linkedin",
  //   responsive: ["sm"],
  // },
  // {
  //   title: "Webiste",
  //   dataIndex: "webiste",
  //   key: "webiste",
  //   responsive: ["sm"],
  // },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Space size="middle">
        {
          <Chip
            label={status}
            color={
              status == "P" ? "warning" : status == "A" ? "success" : "danger"
            }
          />
        }
        {/* {isAdmin} */}
      </Space>
    ),
    responsive: ["sm"],
  },
];

const TableShow = ({ data, isAdmin }) => (
  <Table columns={columns} dataSource={data} isAdmin={isAdmin} />
);

export default TableShow;
