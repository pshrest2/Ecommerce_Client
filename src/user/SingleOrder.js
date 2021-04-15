import React, { useState, useEffect } from "react";
import { findOrder } from "./apiUser";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { API } from "../config";

const SingleOrder = (props) => {
  const [order, setOrder] = useState({});
  const [error, setError] = useState(false);
  const { user, token } = isAuthenticated();

  const loadSingleOrder = (orderId, token) => {
    findOrder(user._id, orderId, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrder(data);
      }
    });
  };

  useEffect(() => {
    const orderId = props.match.params.orderId;

    loadSingleOrder(orderId, token);
  }, [props]);

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
                  {/* <th>Product Id</th> */}
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
                          <td>
                            <input
                              type="number"
                              value={product.count}
                              readOnly
                            />
                          </td>
                          {/* <td>{product._id}</td> */}
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
