import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signup } from "../auth";
import { SECRET } from "../config";

const AdminSignup = () => {
  //state to store admin signup data
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password_again: "",
    secret: "",
    role: "1",
    error: "",
    success: false,
  });

  //destructure all fields from the state
  const {
    name,
    email,
    password,
    password_again,
    secret,
    role,
    success,
    error,
  } = values;

  //hdndleChange function
  const handleChange = (name) => (event) => {
    // this name variable is different from the state's name variable in line 8.
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //clickSubmit function
  const clickSubmit = (event) => {
    event.preventDefault();
    if (password !== password_again) {
      setValues({ ...values, error: "Passwords must match" });
      // } else if (secret !== SECRET) {
    } else if (secret !== "Olemiss2021") {
      console.log(SECRET);
      setValues({ ...values, error: "Secret Key does not match" });
    } else {
      setValues({ ...values, error: false });

      //call the signup API and pass the necessary fields
      signup({ name, email, password, role }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            secret: "",
            error: "",
            success: true,
          });
        }
      });
    }
  };

  //form component
  const signUpForm = () => (
    <form action="">
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Re-Enter Password</label>
        <input
          onChange={handleChange("password_again")}
          type="password"
          className="form-control"
          value={password_again}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Admin Secret Key</label>
        <input
          onChange={handleChange("secret")}
          type="password"
          className="form-control"
          value={secret}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  //error component
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  //success component
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Account Create Successfully. Please <Link to="/signin">Signin</Link>
    </div>
  );

  //main
  return (
    <Layout
      title="Admin Signup Page"
      description="Signup to become an admin"
      className="container col-md-4 offset-md-4"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default AdminSignup;
