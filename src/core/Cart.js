import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCartItems, showProductQuantity } from "./cartHelper";
import Layout from "./Layout";
import Checkout from "./Checkout";
import CartItems from "./CartItems";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCartItems());
  }, [run]);

  const getSubTotal = () => {
    return items.reduce((currentValue, nextValue) => {
      // console.log("Current value: ", currentValue);
      // console.log("Next value: ", nextValue);

      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const getTax = () => {
    return getSubTotal() * 0.07;
  };

  const getTotal = () => {
    return getSubTotal() + getTax();
  };

  const showItems = (items) => {
    return (
      <div className="container">
        <h2>Your Cart has {`${items.length}`} Items</h2>

        <div className="small-container cart-page">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <CartItems key={index} product={item} setRun={setRun} run={run}>
                  {showProductQuantity(item)}
                </CartItems>
              ))}
            </tbody>
          </table>

          <div className="total-price">
            <table>
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>${parseFloat(getSubTotal()).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Tax ( 7% )</td>
                  <td>${parseFloat(getTax()).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>${parseFloat(getTotal()).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <h2>
        Your Cart is Empty. <br />
        <Link to="/shop">Continue Shopping</Link>
      </h2>
    );
  };

  return (
    <Layout
      className="container-fluid"
      title="Shopping Cart"
      description="Manage your cart items."
    >
      <div className="row">
        <div className="col-8">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-4">
          {items.length > 0 ? <Checkout products={items} /> : <></>}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
