import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const baseURL = "http://127.0.0.1:8000/";

const FormComp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submission prevented");
  };

  const createApplication = (event) => {
    axios
      .post(`${baseURL}application-create/`, {
        username: { username }["username"],
        password: { password }["password"],
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Enter your username"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={email}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter your your password"
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={createApplication}>
        Click here to submit form
      </Button>
    </Form>
  );
};

export default FormComp;
