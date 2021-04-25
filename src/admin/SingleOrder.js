import React, { useState, useEffect } from "react";
import { findOrder } from "./apiAdmin";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { API } from "../config";

const SingleOrder = (props) => {
  //state to store and order
  const [order, setOrder] = useState({});
  //state to store the errors
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();

  //load the single order
  const loadSingleOrder = (orderId, token) => {
    //call the findOrder API
    findOrder(user._id, orderId, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrder(data);
      }
    });
  };

  useEffect(() => {
    //get the orderID from the URL parameter
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
                          <td>{product.count}</td>
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
