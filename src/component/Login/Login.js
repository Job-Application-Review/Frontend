import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [auth, setAuth] = useState({
    displayed_form: "",
    logged_in: localStorage.getItem("token") ? true : false,
    username: "",
  });

  const handle_login = (e, data) => {
    console.log(data);
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
        console.log(json);
        localStorage.setItem("token", json.token);
        // setAuth({
        //   logged_in: true,
        //   displayed_form: "",
        //   username: json.user.username,
        // });
      });
  };

  const handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  return (
    <div>
      {/* <form onSubmit={(e) => handle_login(e, loginData)}>
        <h4>Log In</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handle_change}
        />
        <input type="submit" />
      </form> */}

      <Form onSubmit={(e) => handle_login(e, loginData)}>
        <Form.Group>
          {/* <Form.Label>Username</Form.Label> */}
          {/* <Form.Control
            type="text"
            name="username"
            value={loginData.username}
            onChange={handle_change}
            placeholder="Enter your username"
          /> */}
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            type="password"
            margin="normal"
            name="username"
            value={loginData.username}
            onChange={handle_change}
            placeholder="Enter your username"
          />
        </Form.Group>
        <Form.Group>
          {/* <Form.Label>Password:</Form.Label> */}
          {/* <Form.Control
            type="password"
            name="password"
            value={loginData.password}
            onChange={handle_change}
            placeholder="Enter your your password"
          /> */}
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            margin="normal"
            name="password"
            value={loginData.password}
            onChange={handle_change}
            placeholder="Enter your your password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
