import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  //state to store all the orders
  const [orders, setOrders] = useState([]);
  //state to store all the statusValues
  const [statusValues, setStatusValues] = useState([]);

  //destructure user and token from isAuthenticated
  const { user, token } = isAuthenticated();

  //load all the orders
  const loadOrders = () => {
    //call the listOrders API
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  //load all the status values
  const loadStatusValues = () => {
    //call the getStatusValues API
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  //display the total number of orders
  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h4 className="text-danger display-4 text-center">
          Total Orders: {orders.length}
        </h4>
      );
    } else {
      return <h4 className="text-danger">No Orders</h4>;
    }
  };

  //call this function if status value is changed by the admin
  const handleStatusChange = (event, orderId) => {
    //call the updateOrderStatus API
    updateOrderStatus(user._id, token, orderId, event.target.value).then(
      (data) => {
        if (data.error) {
          console.log("Status Update Failed");
        } else {
          //if no error, load the orders
          loadOrders();
        }
      }
    );
  };

  //display the status component
  const showStatus = (order) => (
    <select
      className="form-control"
      onChange={(event) => handleStatusChange(event, order._id)}
      value={order.status}
    >
      <option disabled>Update Status</option>
      {statusValues.map((status, index) => (
        <option key={index} value={status}>
          {status}
        </option>
      ))}
    </select>
  );

  //main
  return (
    <Layout
      className="container-fluid"
      title="Order"
      description="List of orders"
    >
      <div className="container">
        {showOrdersLength()}
        <div className="small-container cart-page">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Customer Name</th>
                <th>Date Purchased</th>
                <th>Delivery Address</th>
                <th>Total</th>
                <th>Status</th>
                {/* <th>Transaction Id</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/admin/orderhistory/${order._id}`}>View</Link>
                  </td>
                  <td>{order.user.name}</td>
                  <td>{moment(order.createdAt).fromNow()}</td>
                  <td>
                    {order.address1},{order.address2},{order.city},{order.state}
                    ,{order.zip}
                  </td>
                  <td>${order.amount}</td>
                  <td>{showStatus(order)}</td>
                  {/* <td>{order.transaction_id}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
