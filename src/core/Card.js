import React from "react";
import ShowImage from "./ShowImage";
import { Link } from "react-router-dom";

import "./css/Card.css";
import "./css/Button.css";

const Card = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <Link className="cards__item__link" to="/">
        <div className="cards__item__info">
          <ShowImage item={product} url="product" />

          <h5 className="cards__item__text">{product.name}</h5>
          <p className="cards__item__text_description">
            {product.description.substring(0, 50)}
          </p>
        </div>

        <button className="btn btn-outline-warning mt-2 mb-2">
          Add to Cart
        </button>
      </Link>
    </div>
  );
};

export default Card;
