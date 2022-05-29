import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TableShow from "./component/Table/Table";
import Api from "./component/Api/Api";
import AdminApi from "./component/AdminApi/AdminApi";
import Detail from "./component/Details/Details";
import Apply from "./component/Apply/Apply";
import PortalLayout from "./component/PortalLayout/PortalLayout";
import ApplicationDetail from "./component/ApplicationDetail/ApplicationDetail";
import Signup from "./component/Signup/Signup";
import Login from "./component/Login/Login";
import FormComp from "./component/Form/FormComp";

function App() {
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
          // console.log(auth);
        });
    }
  });

  const handle_login = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        setAuth({
          logged_in: true,
          displayed_form: "",
          username: json.user.username,
        });
      });
  };

  const handle_signup = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        setAuth({
          logged_in: true,
          displayed_form: "",
          username: json.username,
        });
      });
  };

  const handle_logout = () => {
    localStorage.removeItem("token");
    setAuth({ logged_in: false, username: "" });
  };

  let loggedInComp;
  let signInComp;
  if (!auth.logged_in) {
    signInComp = (
      <Route
        exact
        path="/signuptest"
        element={<PortalLayout ContentComp={<Signup />} />}
      ></Route>
    );
    loggedInComp = (
      <Route
        exact
        path="/logintest"
        element={<PortalLayout ContentComp={<Login />} />}
      ></Route>
    );
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/apply"
            element={<PortalLayout ContentComp={<FormComp />} />}
          ></Route>
          <Route
            exact
            path="/view-application"
            element={<PortalLayout ContentComp={<Detail />} />}
          ></Route>
          <Route
            exact
            path="/admin-view-application"
            element={<PortalLayout ContentComp={<AdminApi />} />}
          ></Route>
          <Route
            exact
            path="/application-detail"
            element={
              <PortalLayout
                ContentComp={
                  <ApplicationDetail url="http://127.0.0.1:8000/application-detail/5/" />
                }
              />
            }
          ></Route>
          {loggedInComp}
          {signInComp}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
