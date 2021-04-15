import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getCategories, deleteCategory } from "./apiAdmin";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, [categories]);

  const showCategoriesLength = () => {
    if (categories.length > 0) {
      return (
        <h4 className="text-danger display-4 text-center">
          Total Categories: {categories.length}
        </h4>
      );
    } else {
      return <h4 className="text-danger">No Categories</h4>;
    }
  };

  return (
    <Layout
      className="container-fluid"
      title="Order"
      description="List of Categories to Update/Delete"
    >
      <div className="container">
        {showCategoriesLength()}
        <div className="small-container cart-page">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Category Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/update/category/${category._id}`}>Edit</Link>
                  </td>
                  <td>{category.name}</td>
                  <td>
                    <a
                      onClick={() => {
                        deleteCategory(category._id, user._id, token);
                      }}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
