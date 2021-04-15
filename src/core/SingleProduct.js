import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { addItem, updateItem } from "./cartHelper";
import { API } from "../config";

const SingleProduct = ({ product, setRun = (f) => f, run = undefined }) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count || 1);
  const [error, setError] = useState(false);

  const showProductStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary">In Stock</span>
    ) : (
      <span className="badge badge-danger">Out of Stock</span>
    );
  };

  const addToCart = () => {
    if (product.quantity > 0) {
      addItem(product, () => {
        setRedirect(true);
      });
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
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
    if (product.quantity < 10 && product.quantity > 0) {
      return (
        <div className="limitedProduct">
          Only {product.quantity} items left!
        </div>
      );
    }
  };

  const showUpdateCart = () => {
    if (product.quantity > 0) {
      return (
        <input
          type="number"
          value={count}
          min="0"
          max={product.quantity}
          onChange={handleChange(product._id)}
          style={{ width: "80px", padding: "10px" }}
        />
      );
    }
  };

  const handleChange = (id) => (event) => {
    setRun(!run);
    let countValue = event.target.value;

    if (countValue > product.quantity) {
      countValue = product.quantity;
      setCount(product.quantity);
    } else if (countValue < 1) {
      countValue = 1;
      setCount(1);
    } else {
      setCount(countValue);
    }

    if (countValue >= 1 && countValue <= product.quantity) {
      updateItem(product._id, countValue);
    }
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      id="error"
      style={{ display: error ? "" : "none" }}
    >
      Product is out of stock
    </div>
  );

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
        {showError()}
        {showProductQuantity()}
        {showUpdateCart()} <br />
        {showProductStock(product.quantity)} <br />
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
