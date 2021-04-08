import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const ManageProducts = () => {
  return (
    <Layout
      className="Manage Products"
      title="Home Page"
      description="Perform CRUD on products"
    >
      <h2 className="mb-4">Manage Products</h2>

      <div className="row">
        <div>...</div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
