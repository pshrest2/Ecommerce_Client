import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h2 className="text-danger display-2">Total Orders: {orders.length}</h2>
      );
    } else {
      return <h2 className="text-danger">No Orders</h2>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  return (
    <Layout title="Orders" description="Manage your orders">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          {showOrdersLength()}
          {orders.map((order, orderIndex) => {
            return (
              <div
                className="mt-5"
                key={orderIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order ID: {order._id}</span>
                </h2>

                <ul className="list-group mb=2">
                  <li className="list-group-item">{order.status}</li>
                  <li className="list-group-item">
                    Transaction ID: {order.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${order.amount}</li>
                  <li className="list-group-item">
                    Ordered By: {order.user.name}
                  </li>
                  <li className="list-group-item">
                    Ordered: {moment(order.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address: {order.address}
                  </li>
                </ul>

                <h3 className="mt-4 mb-4 font-italic">
                  Total Products in the order: {order.products.length}
                </h3>

                {order.products.map((product, productIndex) => {
                  <div
                    className="mb-4"
                    key={productIndex}
                    style={{ padding: "20px", border: "1px solid indigo" }}
                  >
                    {showInput("Product Name", product.name)}
                    {showInput("Product Price", product.price)}
                    {showInput("Product Count", product.count)}
                    {showInput("Product Id", product._id)}
                  </div>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
