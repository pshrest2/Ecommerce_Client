import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteCategory, updateCategory, getCategory } from "./apiAdmin";

const UpdateCategory = (props) => {
  const [category, setCategory] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure user and info from local storage
  const { user, token } = isAuthenticated();

  const loadCategory = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategory(data.name);
      }
    });
  };

  useEffect(() => {
    const categoryId = props.match.params.categoryId;
    loadCategory(categoryId);
  }, []);

  const handleChange = (event) => {
    setError("");
    setSuccess(false);
    setCategory(event.target.value);
  };

  const cilckSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // make request to api category
    updateCategory(category._id, user._id, token, { category }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const updateCategoryForm = () => {
    return (
      <form onSubmit={cilckSubmit}>
        <div className="container form-group">
          <label className="text-muted">Category Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={category}
            autoFocus
            required
          />
          <br />
          <button className="btn btn-outline-primary">Update Category</button>
        </div>
      </form>
    );
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{category} is updated</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className="container mt-5">
      <Link to="/update/categories" className="text-warning">
        Back to Categories
      </Link>
    </div>
  );

  return (
    <Layout title="Add a new Category" description={user.name}>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          {showSuccess()}
          {showError()}
          {updateCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCategory;
