import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import Chip from "@mui/material/Chip";
import {
  DownOutlined,
  UserOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  CloseSquareOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import swal from "sweetalert";

const baseURL = "http://127.0.0.1:8000/";

const handleActionClick = (e) => {
  if (e.target === e.currentTarget) {
    let classes = e.target.className["baseVal"];
    classes = classes.toString();
    classes = classes.split(" ");
    let pkUpdate;
    classes.forEach((element) => {
      if (element.substring(0, 3) == "id-") {
        pkUpdate = element.substring(3);
      }
    });
    let pk = pkUpdate.substring(0, pkUpdate.length - 1);
    // let updateStatus =
    //   pkUpdate.substring(pkUpdate.length - 1) == "A" ? "Accept" : "Reject";
    let updateStatus = pkUpdate.substring(pkUpdate.length - 1);

    swal({
      icon: "warning",
      buttons: {
        confirm:
          pkUpdate.substring(pkUpdate.length - 1) == "A" ? "Accept" : "Reject",
        cancel: true,
      },
    }).then(function(isConfirm) {
      if (isConfirm) {
        axios
          .put(
            `${baseURL}application-update/${pk}/`,
            {
              status: updateStatus,
            },
            {
              headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            swal({
              text: "Application Status Updated",
              icon: "success",
            });
            console.log(response);
          });
      }
    });
  }
};

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    responsive: ["sm"],
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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
    title: "Application",
    dataIndex: "id",
    key: "id",
    render: (id, data) => (
      <>
        <a href={baseURL + "application-detail/" + id.toString()}>
          <VisibilityIcon label="View" color="primary" clickable />
        </a>
        <Chip
          sx={{ m: 2 }}
          label={
            data["status"] == "P"
              ? "Pending"
              : data["status"] == "A"
              ? "Accepted"
              : "Rejected"
          }
        />
      </>
    ),
    responsive: ["sm"],
  },
  {
    title: "Action",
    dataIndex: "id",
    key: "id",
    render: (id) => (
      <Space size="middle">
        <DoneIcon
          className={"id-" + id + "A"}
          onClick={handleActionClick}
          clickable
        />
        <CloseIcon className={`id-${id}R `} onClick={handleActionClick} />
      </Space>
    ),
    responsive: ["sm"],
  },
];

const TableShow = ({ data }) => <Table columns={columns} dataSource={data} />;

export default TableShow;
