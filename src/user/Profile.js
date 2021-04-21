import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated, hashed_password } from "../auth/index";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    old_password: "",
    password: "",
    password_again: "",
    error: "",
    success: false,
  });

  const {
    name,
    email,
    old_password,
    password,
    password_again,
    error,
    success,
  } = values;
  const { token } = isAuthenticated();

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const updateProfile = () => {
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    let id = match.params.userId;

    if (old_password === "" && password === "" && password_again === "") {
      updateProfile();
    } else {
      hashed_password({ id, old_password }, token).then((data) => {
        if (data === true) {
          if (password === "" || password_again === "") {
            setValues({ ...values, error: "Password fields cannot be empty" });
          } else if (password === password_again) {
            updateProfile();
          } else {
            setValues({ ...values, error: "Passwords must match" });
          }
        } else {
          setValues({ ...values, error: "Old password does not match" });
        }
      });
    }
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={handleChange("email")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Old Password</label>
        <input
          className="form-control"
          type="password"
          value={old_password}
          onChange={handleChange("old_password")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">New Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={handleChange("password")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Re-Enter Password</label>
        <input
          className="form-control"
          type="password"
          value={password_again}
          onChange={handleChange("password_again")}
        />
      </div>

      <button className="btn btn-primary" onClick={clickSubmit}>
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      className="container col-sm-4 offset-sm-4"
      title="Profile"
      description="Update Your Profile"
    >
      <h2 className="mb-4">Profile Update</h2>
      {showError()}
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
