import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure user and info from local storage

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setSuccess(false);
    setName(event.target.value);
  };
  const cilckSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // make request to api category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => {
    return (
      <form onSubmit={cilckSubmit}>
        <div className="container form-group">
          <label className="text-muted">Category Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            autoFocus
            required
          />
          <br />
          <button className="btn btn-outline-primary">Create Category</button>
        </div>
      </form>
    );
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className="container mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout title="Add a new Category" description={user.name}>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
