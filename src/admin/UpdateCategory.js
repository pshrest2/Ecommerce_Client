import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./apiAdmin";

const UpdateCategory = (props) => {
  //state to store the name of the category
  const [name, setName] = useState({});
  //error state
  const [error, setError] = useState(false);
  //success state
  const [success, setSuccess] = useState(false);

  //destructure user and info from local storage
  const { user, token } = isAuthenticated();

  //load all the categories
  const loadCategory = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    const categoryId = props.match.params.categoryId;
    loadCategory(categoryId);
  }, []);

  //handleChange function
  const handleChange = (event) => {
    setError("");
    setSuccess(false);
    setName(event.target.value || "");
  };

  //call this function once the form is submitted
  const cilckSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // make request to api category
    updateCategory(props.match.params.categoryId, user._id, token, {
      name,
    }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  //form component to update category
  const updateCategoryForm = () => {
    return (
      <form onSubmit={cilckSubmit}>
        <div className="container form-group">
          <label className="text-muted">Category Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name || ""}
            autoFocus
            required
          />
          <br />
          <button className="btn btn-outline-primary">Update Category</button>
        </div>
      </form>
    );
  };

  //success component
  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">Category is updated</h3>;
    }
  };

  //error component
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  //go back to categories component
  const goBack = () => (
    <div className="container mt-5">
      <Link to="/update/category" className="text-warning">
        Back to Categories
      </Link>
    </div>
  );

  //main
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
