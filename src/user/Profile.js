import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated, hashed_password } from "../auth/index";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";

const Profile = ({ match }) => {
  //state to store user info
  const [values, setValues] = useState({
    name: "",
    email: "",
    old_password: "",
    password: "",
    password_again: "",
    error: "",
    success: false,
  });

  //destructure required info of user
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

  //init function to get a user's info
  const init = (userId) => {
    //API to read a user
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

  //handle Change function for handling changes made in a form
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //function to update the profile of a user
  const updateProfile = () => {
    //API to update user profile
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

  //call this function once the form is submitted
  const clickSubmit = (event) => {
    event.preventDefault();
    let id = match.params.userId;

    //if password fields are empty, simply update user name or email
    if (old_password === "" && password === "" && password_again === "") {
      updateProfile();
    }
    //else update password along with other fields
    else {
      //authenticate the user by checking if the old password matches
      hashed_password({ id, old_password }, token).then((data) => {
        if (data === true) {
          //if user is authenticated, check if both password fields are not empty
          if (password === "" || password_again === "") {
            setValues({ ...values, error: "Password fields cannot be empty" });
          }
          //then check if both password match
          else if (password === password_again) {
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

  //error component
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  //redirect user to dashboard once successfully updating the profile
  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  //form component to update the profile
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

  //main
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
