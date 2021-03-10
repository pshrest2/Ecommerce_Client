import React, { useState } from "react";
import ShowImage from "./ShowImage";
import { Link, Redirect } from "react-router-dom";
import { addItem } from "./cartHelper";
import moment from "moment";

import "./css/Card.css";
import "./css/Button.css";

const Card = ({ product, showAddToCartButton = true }) => {
  const [redirect, setRedirect] = useState(false);

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
    </>
  );
};

export default Card;
