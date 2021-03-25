import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateItem, removeItem } from "./cartHelper";
import { API } from "../config";

import "./css/Card.css";
import "./css/Button.css";
import "./css/Cart.css";

const CartItems = ({ product, setRun = (f) => f, run = undefined }) => {
  const [count, setCount] = useState(product.count);

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
          <input
            type="number"
            value={count}
            onChange={handleChange(product._id)}
          />
        </td>
        <td>${parseFloat(product.price * product.count).toFixed(2)}</td>
      </tr>
    </>
  );
};

export default CartItems;
