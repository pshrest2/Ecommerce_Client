import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";
import { Link } from "react-router-dom";

const UserHistory = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    getPurchaseHistory(user._id, token).then((data) => {
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
        <h4 className="text-danger display-4 text-center">
          Total Orders: {orders.length}
        </h4>
      );
    } else {
      return <h4 className="text-danger">No Orders</h4>;
    }
  };

  //   const showStatus = (order) => (
  //     <select
  //       className="form-control"
  //       onChange={(event) => handleStatusChange(event, order._id)}
  //     >
  //       <option disabled>Update Status</option>
  //       {statusValues.map((status, index) => (
  //         <option key={index} value={status}>
  //           {status}
  //         </option>
  //       ))}
  //     </select>
  //   );

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
                <th>Transaction Id</th>
                <th>Customer Name</th>
                <th>Date Purchased</th>
                <th>Delivery Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/user/orderhistory/${order._id}`}>
                      {order.transaction_id}
                    </Link>
                  </td>
                  <td>{order.user.name}</td>
                  <td>{moment(order.createdAt).fromNow()}</td>
                  <td>
                    {order.address1},{order.address2},{order.city},{order.state}
                    ,{order.zip}
                  </td>
                  <td>${order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default UserHistory;
