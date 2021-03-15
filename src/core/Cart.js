import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCartItems } from "./cartHelper";
import Layout from "./Layout";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCartItems());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
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
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your Cart Summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
