import React from "react";
import ShowImage from "./ShowImage";
import { Link } from "react-router-dom";
import moment from "moment";

import "./css/Card.css";
import "./css/Button.css";

const Card = ({ product }) => {
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

  const showAddToCart = () => {
    return (
      <button className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>
    );
  };

  return (
    <Link className="cards__item__link" to={`/product/${product._id}`}>
      <div className="cards__item__info">
        <ShowImage item={product} url="product" />

        <h5 className="cards__item__text">{product.name}</h5>
        <p className="cards__item__text_description">
          {product.description.substring(0, 50)} <br />
          Category: {product.category && product.category.name} <br />
          Added {moment(product.createdAt).fromNow()} <br />
          {showProductStock(product.quantity)}
        </p>
      </div>
      {showAddToCart()}
    </Link>
  );
};

export default Card;
