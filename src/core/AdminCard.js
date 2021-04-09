import React, { useState } from "react";
import ShowImage from "./ShowImage";
import { Link, Redirect } from "react-router-dom";
import { addItem, updateItem, removeItem } from "./cartHelper";
import { getProducts, deleteProduct } from "../admin/apiAdmin";
import { isAuthenticated } from "../auth";

import moment from "moment";

import "./css/Card.css";
import "./css/Button.css";

const AdminCard = ({ product, loadArrival, loadSell }) => {
  const [redirect, setRedirect] = useState(false);
  const { user, token } = isAuthenticated();

  const delProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //Update parent parent component's setProductsByArrival to true
        loadArrival ? loadArrival() : window.location.reload();
        loadSell ? loadSell() : window.location.reload();
      }
    });
  };

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

  const willRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const showRemoveCartItem = () => {
    return (
      <button
        onClick={() => delProduct(product._id)}
        className="btn btn-outline-danger mt-2 mb-2"
      >
        Remove Item
      </button>
    );
  };

  const showUpdateCart = () => {
    return (
      <Link to={`/admin/product/update/${product._id}`}>
        <button className="btn btn-outline-warning mt-2 mb-2">
          Update Item
        </button>
      </Link>
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
      {showUpdateCart()}
      {showRemoveCartItem()}
    </>
  );
};

export default AdminCard;
