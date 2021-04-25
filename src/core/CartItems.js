import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateItem, removeItem } from "./cartHelper";
import { API } from "../config";

import "./css/Card.css";
import "./css/Button.css";
import "./css/Cart.css";

const CartItems = ({
  product,
  setRun = (f) => f,
  run = undefined,
  children,
}) => {
  //count state for each product in the cart
  const [count, setCount] = useState(product.count);

  //handle change function
  const handleChange = (product) => (event) => {
    setRun(!run);
    let countValue = event.target.value;

    //if the count value is greater than total items in stock,
    //set the count value to the total items in stock
    if (countValue > product.quantity) {
      countValue = product.quantity;
      setCount(product.quantity);
    }
    //also, don't let users set count < 1
    else if (countValue < 1) {
      countValue = 1;
      setCount(1);
    } else {
      setCount(countValue);
    }

    if (countValue >= 1 && countValue <= product.quantity) {
      //if count value is correct, call the updateItem to udpate the count value in localstorage
      updateItem(product._id, countValue);
    }
  };

  //main
  return (
    <>
      <tr>
        <td>
          <div className="cart-info">
            <Link to={`/product/${product._id}`}>
              <div className="cart-img">
                <img
                  alt={product.name}
                  src={`${API}/product/photo/${product._id}`}
                />
              </div>
            </Link>

            <div>
              <p>{product.name}</p>
              <small>Price: ${product.price}</small>
              <br />
              <a
                onClick={() => {
                  removeItem(product._id);
                  setRun(!run);
                }}
              >
                Remove
              </a>
            </div>
          </div>
        </td>

        <td>
          <div>{children}</div>

          <input
            type="number"
            value={product.count}
            min="1"
            max={product.quantity}
            onChange={handleChange(product)}
          />
        </td>
        <td>${parseFloat(product.price * count).toFixed(2)}</td>
      </tr>
    </>
  );
};

export default CartItems;
