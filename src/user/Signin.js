import React, { useState } from "react";
import Layout from "../core/Layout";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  //state to store the user email and password for signin
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirect: false,
  });

  //destructure necessary fields for signin
  const { email, password, error, loading, redirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    // this name variable is different from the state's name variable in line 8.
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  //call this function once form is submitted
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    //call the signin API to signin the user
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //call the authenticate API to authenticate the user
        authenticate(data, () => {
          setValues({
            ...values,
            redirect: true,
          });
        });
      }
    });
  };

  //signin form component
  const signInForm = () => (
    <form>
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

  //loading component
  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  //redirect user once signin. If user is admin, redirect to admin dashboard if not redirect to user dashboard
  const redirectUser = () => {
    if (redirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  //main
  return (
    <Layout
      title="Sign In Page"
      description="Node React ECommerce App"
      className="container col-md-4 offset-md-4"
    >
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
