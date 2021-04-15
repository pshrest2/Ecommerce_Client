import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { getCategories, deleteCategory } from "./apiAdmin";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth";
const { user, token } = isAuthenticated();

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const delCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

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
      title="Categories"
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
                    <div className="cart-info">
                      <Link to={`/update/category/${category._id}`}>Edit</Link>
                    </div>
                  </td>
                  <td>
                    <div className="cart-info">{category.name}</div>
                  </td>

                  <td>
                    <div className="cart-info">
                      <a
                        onClick={() => {
                          delCategory(category._id, user._id, token);
                        }}
                      >
                        Delete
                      </a>
                    </div>
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
