import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { API } from "../config";
import { deleteProduct } from "../admin/apiAdmin";
import { isAuthenticated } from "../auth";

const AdminSingleProduct = ({
  product,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const { user, token } = isAuthenticated();

  //delete a product by callin deleteProduct API
  const delProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRedirect(true);
      }
    });
  };

  //display total items in stock or out of stock
  const showProductStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary">In Stock: {quantity}</span>
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

  //display the total quantity of a product it is less than 10.
  //This is warning to user/admin that there is less items available
  const showProductQuantity = () => {
    if (product.quantity < 10 && product.quantity > 0) {
      return (
        <div className="limitedProduct">
          Only {product.quantity} items left!
        </div>
      );
    }
  };

  //display remove item button
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

  //display update item button
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
        {showProductStock(product.quantity)}
        {showProductQuantity()}
        <br />
        {showUpdateCart()}
        <br />
        {showRemoveCartItem()}
        <h3 className="mt-5">
          Product Details <i className="fa fa-indent"></i>
        </h3>
        <br />
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default AdminSingleProduct;
