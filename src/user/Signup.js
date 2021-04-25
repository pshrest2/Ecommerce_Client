import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signup } from "../auth";

const Signup = () => {
  //signup state
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password_again: "",
    error: "",
    success: false,
  });

  //signup fields destructure
  const { name, email, password, password_again, success, error } = values;

  const handleChange = (name) => (event) => {
    // this name variable is different from the state's name variable in line 8.
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //submit function
  const clickSubmit = (event) => {
    event.preventDefault();
    if (password !== password_again) {
      setValues({ ...values, error: "Passwords must match" });
    } else {
      setValues({ ...values, error: false });
      //call signup API to create new user
      signup({ name, email, password }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      });
    }
  };

  //signup form component
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
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
      <Link className="ml-5" to="/admin/signup">
        Are you an admin?
      </Link>
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
      title="Sign Up Page"
      description="Node React ECommerce App"
      className="container col-md-4 offset-md-4"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
