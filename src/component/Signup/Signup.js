import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Signup() {
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
  });

  const [auth, setAuth] = useState({
    displayed_form: "",
    logged_in: localStorage.getItem("token") ? true : false,
    username: "",
  });

  const handle_signup = (e, data) => {
    console.log(data);
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

  const handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    console.log(value);
    setSignupData((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handle_signup(e, signupData)}>
        <h4>Sign Up</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={signupData.username}
          onChange={handle_change}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={signupData.password}
          onChange={handle_change}
        />
        <input type="submit" />
      </form>

      <Form onSubmit={(e) => handle_signup(e, signupData)}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={signupData.username}
            onChange={handle_change}
            placeholder="Enter your username"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={signupData.password}
            onChange={handle_change}
            placeholder="Enter your your password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Click here to submit form
        </Button>
      </Form>
    </div>
  );
}

// Signup.propTypes = {
//   handle_signup: PropTypes.func.isRequired,
// };
export default Signup;
