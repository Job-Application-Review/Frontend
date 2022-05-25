import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const baseURL = "http://127.0.0.1:8000/";

const FormComp = () => {
  const [name, setName] = useState("sdfdsf");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [reason, setReason] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submission prevented");
  };

  const createApplication = (event) => {
    axios
      .post(`${baseURL}application-create/`, {
        name: { name }["name"],
        email: { email }["email"],
        phone: { phone }["phone"],
        city: { city }["city"],
        linkedin: { linkedin }["linkedin"],
        website: { website }["website"],
        reason: { reason }["reason"],
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Enter your full name:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter your full name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your email address:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter your your email address"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your phone:</Form.Label>
        <Form.Control
          type="number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Enter your phone"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your city:</Form.Label>
        <Form.Control
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          placeholder="Enter your city"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your linkedin:</Form.Label>
        <Form.Control
          type="url"
          value={linkedin}
          onChange={(e) => {
            setLinkedin(e.target.value);
          }}
          placeholder="Enter your your linkedin"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your website link:</Form.Label>
        <Form.Control
          type="url"
          value={website}
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
          placeholder="Website link"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your reason:</Form.Label>
        <Form.Control
          type="text"
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
          placeholder="Enter your your reason to join"
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={createApplication}>
        Click here to submit form
      </Button>
    </Form>
  );
};

export default FormComp;
