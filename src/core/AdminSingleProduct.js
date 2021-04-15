import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { addItem, updateItem } from "./cartHelper";
import { API } from "../config";

const AdminSingleProduct = ({
  product,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showProductStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary">In Stock: {quantity}</span>
    ) : (
      <span className="badge badge-danger">Out of Stock</span>
    );
  };

  const willRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
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
