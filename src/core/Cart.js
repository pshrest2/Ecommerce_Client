import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCartItems } from "./cartHelper";
import { updateItem, removeItem } from "./cartHelper";
import Layout from "./Layout";
import Card from "./Card";
import Checkout from "./Checkout";
import CartItems from "./CartItems";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setItems(getCartItems());
  }, [run]);

  const handleChange = (id) => (event) => {
    setRun(!run);
    let count = event.target.value;
    setCount(count < 1 ? 1 : count);
    if (count >= 1) {
      updateItem(id, count);
    }
  };

  const getTotal = () => {
    return items.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showItems = (items) => {
    return (
      <div className="container">
        <h2>Your cart has {`${items.length}`} items</h2>

        <div className="small-container cart-page">
          <table>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
            {items.map((item, index) => (
              <CartItems product={item} setRun={setRun} run={run} />
            ))}
          </table>

          <div className="total-price">
            <table>
              <tr>
                <td>Subtotal</td>
                <td>${getTotal()}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>$50.00</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$250.00</td>
              </tr>
            </table>
          </div>
        </div>

        <hr />
        <div className="row">
          {items.map((product, index) => (
            <div key={index} className="col-4 mb-3">
              <Card
                product={product}
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveCartItemButton={true}
                setRun={setRun}
                run={run}
              />
            </div>
          ))}
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
        <div className="col-12">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Your Cart Summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
