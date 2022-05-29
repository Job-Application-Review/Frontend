import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import SendIcon from "@mui/icons-material/Send";
import styles from "./FormComp.module.css";
import swal from "sweetalert";

const baseURL = "http://127.0.0.1:8000/";
const FormComp = () => {
  const [name, setName] = useState("");
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

  const createApplication = (event) => {
    axios
      .post(
        `${baseURL}application-create/`,
        {
          username: auth.username,
          name: { name }["name"],
          email: { email }["email"],
          phone: { phone }["phone"],
          city: { city }["city"],
          linkedin: { linkedin }["linkedin"],
          website: { website }["website"],
          reason: { reason }["reason"],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          swal({
            icon: "success",
            title: "Application Successfully subimtted",
          });
        } else {
          swal({
            icon: "warning",
            title: "There's some error occurred",
          });
        }
      });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        {/* <Form.Label>Enter your full name:</Form.Label> */}
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          type="text"
          margin="normal"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter your full name"
        />
        {/* <Form.Control
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter your full name"
        /> */}
      </Form.Group>
      <Form.Group>
        {/* <Form.Label>Enter your email address:</Form.Label> */}
        <TextField
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          type="text"
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {/* <Form.Control
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter your your email address"
        /> */}
      </Form.Group>
      <Form.Group>
        {/* <Form.Label>Enter your phone:</Form.Label> */}
        <TextField
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          type="number"
          margin="normal"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        {/* <Form.Control
          type="number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Enter your phone"
        /> */}
      </Form.Group>
      <Form.Group>
        {/* <Form.Label>Enter your city:</Form.Label> */}
        <TextField
          id="outlined-basic"
          label="City"
          variant="outlined"
          type="text"
          margin="normal"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        {/* <Form.Label>Enter your linkedin:</Form.Label> */}
        <TextField
          id="outlined-basic"
          label="Linkedin Link"
          variant="outlined"
          margin="normal"
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        {/* <Form.Control
          type="url"
          value={linkedin}
          onChange={(e) => {
            setLinkedin(e.target.value);
          }}
          placeholder="Enter your your linkedin"
        /> */}
      </Form.Group>
      <Form.Group>
        {/* <Form.Label>Enter your website link:</Form.Label> */}
        <TextField
          id="outlined-basic"
          label="Website Link"
          variant="outlined"
          margin="normal"
          type="url"
          value={website}
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
        />
        {/* <Form.Control
          type="url"
          value={website}
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
          placeholder="Website link"
        /> */}
      </Form.Group>
      <Form.Group>
        {/* <Form.Label>Enter your reason:</Form.Label> */}
        <TextField
          id="outlined-basic"
          label={"Reason to join"}
          // label={'margin="normal"'}
          margin="normal"
          variant="outlined"
          type="text"
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
        />
        {/* <Form.Control
          type="text"
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
          placeholder="Enter your your reason to join"
        /> */}
      </Form.Group>

      <Chip
        icon={<SendIcon />}
        label="Submit Your Application"
        // label="With Icon"
        margin="normal"
        onClick={createApplication}
      />

      {/* <Button variant="primary" type="submit" onClick={createApplication}>
        Click here to submit form
      </Button> */}
    </Form>
  );
};

export default FormComp;
