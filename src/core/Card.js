import React, { useState } from "react";
import ShowImage from "./ShowImage";
import { Redirect } from "react-router-dom";
import { addItem } from "./cartHelper";
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

  //show if product is in stock or out of stock
  const showProductStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary">In Stock</span>
    ) : (
      <span className="badge badge-danger">Out of Stock</span>
    );
  };

  //add product to card
  const addToCart = () => {
    //only add product to card it quantity is > 0
    if (product.quantity > 0) {
      //call addItem API to add item to local storage
      addItem(product, () => {
        setRedirect(true);
      });
    } else {
      //if product's quantity is < 0 show error with a timer of 3 seconds
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  //redirect to cart page
  const willRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  //add to cart button
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

  //error component
  const showError = () => (
    <div
      className="alert alert-danger"
      id="error"
      style={{ display: error ? "" : "none" }}
    >
      Product is out of stock
    </div>
  );

  //main
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
