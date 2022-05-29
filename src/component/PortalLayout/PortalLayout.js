import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import TableShow from "../Table/Table";
import Button from "@mui/material/Button";
import Api from "../Api/Api";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PreviewIcon from "@mui/icons-material/Preview";
import { LoginOutlined, FormOutlined } from "@ant-design/icons";
import { Redirect, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
const { Header, Sider, Content } = Layout;

const PortalLayout = ({ ContentComp }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  function thisFunction({ item, key, keyPath, domEvent }) {
    console.log(key);
    navigate("/" + key);
  }
  const [auth, setAuth] = useState({
    displayed_form: "",
    logged_in: localStorage.getItem("token") ? true : false,
    username: "",
  });
  useEffect(() => {
    if (auth.logged_in) {
      fetch("http://localhost:8000/current_user/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setAuth({ username: json.username });
          console.log(json);
        });
    }
  });

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          onClick={thisFunction}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: auth.username,
              disabled: "true",
            },
            {
              key: "apply",
              icon: <FormOutlined />,
              label: "Apply for Job",
            },
            {
              key: "view-application",
              icon: <PreviewIcon />,
              label: "View Applications",
            },
            {
              key: "admin-view-application",
              icon: <FormOutlined />,
              label: "Admin View",
            },
            {
              key: "logintest",
              icon: <LoginOutlined />,
              label: "Login",
              onTitleClick: function() {
                console.log("hello");
              },
            },
            {
              key: "signuptest",
              icon: <NoteAddIcon />,
              label: "Sign Up",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {ContentComp}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PortalLayout;
