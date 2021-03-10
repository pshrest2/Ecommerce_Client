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
  cartUpdate = false,
  showRemoveCartItemButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
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

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveCartItem = (showRemoveCartItemButton) => {
    return (
      showRemoveCartItemButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Item
        </button>
      )
    );
  };

  const showUpdateCart = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend0">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
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
    <>
      <Link className="cards__item__link" to={`/product/${product._id}`}>
        <div className="cards__item__info">
          {willRedirect(redirect)}
          <ShowImage item={product} url="product" />
          <h5 className="cards__item__text">{product.name}</h5>
          <p className="cards__item__text_description">
            {product.description.substring(0, 50)} <br />
            Category: {product.category && product.category.name} <br />
            Added {moment(product.createdAt).fromNow()} <br />
            {showProductStock(product.quantity)}
          </p>
        </div>
      </Link>
      {showAddToCart(showAddToCartButton)}
      {showUpdateCart(cartUpdate)}
      {showRemoveCartItem(showRemoveCartItemButton)}
    </>
  );
};

export default Card;
