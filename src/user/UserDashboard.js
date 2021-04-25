import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  //destructure userID, name, email and user role from the isAuthenticated middleware
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  //user links components
  const userlinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/user/orderhistory`}>
              Purchase History
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  //user info component
  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>

        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  //main
  return (
    <Layout title="Dashboard" description={name} className="container">
      <div className="row">
        <div className="col-3">{userlinks()}</div>
        <div className="col-9">{userInfo()}</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
