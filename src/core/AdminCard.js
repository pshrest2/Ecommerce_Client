import React, { useState } from "react";
import ShowImage from "./ShowImage";
import { Link, Redirect } from "react-router-dom";
import { deleteProduct } from "../admin/apiAdmin";
import { isAuthenticated } from "../auth";

import moment from "moment";

import "./css/Card.css";
import "./css/Button.css";

//each admin card receives productInfo, and two functions to call later
const AdminCard = ({ product, loadArrival, loadSell }) => {
  const [redirect, setRedirect] = useState(false);
  const { user, token } = isAuthenticated();

  //delete a product
  const delProduct = (productId) => {
    //call deleteProduct API to delete product
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //once a product is deleted, we need to rerender the home page. Thus,
        //call the parent components's loadArrival and loadSell functions
        loadArrival ? loadArrival() : window.location.reload();
        loadSell ? loadSell() : window.location.reload();
      }
    });
  };

  //display if a product is in stock or out of stock
  const showProductStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary">In Stock</span>
    ) : (
      <span className="badge badge-danger">Out of Stock</span>
    );
  };

  //redirect to home page
  const willRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  //display remove item button in the card
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

  //display update item button in the cart
  const showUpdateCart = () => {
    return (
      <Link to={`/admin/product/update/${product._id}`}>
        <button className="btn btn-outline-warning mt-2 mb-2">
          Update Item
        </button>
      </Link>
    );
  };

  //main
  return (
    <div className="cards__item__link">
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
        {showUpdateCart()}
        {showRemoveCartItem()}
      </div>
    </div>
  );
};

export default AdminCard;
