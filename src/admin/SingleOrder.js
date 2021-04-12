import React, { useState, useEffect } from "react";
import { findOrder } from "./apiAdmin";
import { isAuthenticated } from "../auth";

const SingleOrder = (props) => {
  const [order, setOrder] = useState({});
  const [error, setError] = useState(false);
  const { user, token } = isAuthenticated();

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

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
      {order.products
        ? order.products.map((product, productIndex) => {
            return (
              <div
                className="mb-4"
                key={productIndex}
                style={{ padding: "20px", border: "1px solid indigo" }}
              >
                {showInput("Product Name", product.name)}
                {showInput("Product Price", product.price)}
                {showInput("Product Count", product.count)}
                {showInput("Product Id", product._id)}
              </div>
            );
          })
        : null}
    </>
  );
};

export default SingleOrder;
