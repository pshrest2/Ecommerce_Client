import React, { useState, useEffect } from "react";
import { findOrder } from "./apiUser";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { API } from "../config";

const SingleOrder = (props) => {
  //state to store a single order
  const [order, setOrder] = useState({});

  //error state
  const [error, setError] = useState(false);
  const { user, token } = isAuthenticated();

  //load single order
  const loadSingleOrder = (orderId, token) => {
    //findOrder API to get a single order
    findOrder(user._id, orderId, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrder(data);
      }
    });
  };

  useEffect(() => {
    //get order ID form URL
    const orderId = props.match.params.orderId;
    loadSingleOrder(orderId, token);
  }, [props]);

  //main
  return (
    <>
      <Layout
        className="container-fluid"
        title="Order"
        description="List of orders"
      >
        <div className="container">
          <div className="small-container cart-page">
            <table>
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product Count</th>
                </tr>
              </thead>
              <tbody>
                {order.products
                  ? order.products.map((product, productIndex) => {
                      return (
                        <tr key={productIndex}>
                          <td>
                            <Link to={`/product/${product._id}`}>
                              <div className="cart-img">
                                <img
                                  alt={product.name}
                                  src={`${API}/product/photo/${product._id}`}
                                />
                              </div>
                            </Link>
                          </td>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.count}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SingleOrder;
