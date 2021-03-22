import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { addItem, updateItem } from "./cartHelper";
import moment from "moment";
import { API } from "../config";

const SingleProduct = ({ product, setRun = (f) => f, run = undefined }) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showProductStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary padge-pill stockValue">
        In Stock
      </span>
    ) : (
      <span className="badge badge-primary padge-pill stockValue">
        Out of Stock
      </span>
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const willRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = () => {
    return (
      <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
        Add to Cart
      </button>
    );
  };

  const showProductQuantity = () => {
    if (product.quantity < 10) {
      return <div>Only {product.quantity} items left!</div>;
    }
  };

  const showUpdateCart = () => {
    return (
      <input type="number" value={count} onChange={handleChange(product._id)} />
    );
  };

  const handleChange = (id) => (event) => {
    setRun(!run);
    let count = event.target.value;
    setCount(count < 1 ? 1 : count);
    if (count >= 1) {
      updateItem(id, count);
    }
  };

  return (
    <div className="row">
      <div className="col-6">
        {willRedirect(redirect)}
        <img
          alt={product.name}
          src={`${API}/product/photo/${product._id}`}
          width="100%"
        />
      </div>

      <div className="col-6">
        <h1>{product.name}</h1>
        <h4>${product.price}</h4>
        {showProductQuantity()}
        {showUpdateCart()} <br />
        {showAddToCart()}
        <h3 className="mt-5">
          Product Details <i className="fa fa-indent"></i>
        </h3>
        <br />
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default SingleProduct;
