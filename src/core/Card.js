import React, { useState } from "react";
import ShowImage from "./ShowImage";
import { Link, Redirect } from "react-router-dom";
import { addItem, updateItem, removeItem } from "./cartHelper";
import moment from "moment";

import "./css/Card.css";
import "./css/Button.css";

const Card = ({
  product,
  showAddToCartButton = true,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
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

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={() => {
            addToCart();
            setRun(!run);
          }}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
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
    <div className="cards__item__link">
      <div className="cards__item__info">
        {willRedirect(redirect)}
        {showError()}
        <ShowImage item={product} url="product" />
        <h5 className="cards__item__text">{product.name}</h5>
        <p className="cards__item__text_description">
          {product.description.substring(0, 50)} <br />
          Category: {product.category && product.category.name} <br />
          Added {moment(product.createdAt).fromNow()} <br />
          {showProductStock(product.quantity)}
        </p>
      </div>
      {showAddToCart(showAddToCartButton)}
    </div>
  );
};

export default Card;
