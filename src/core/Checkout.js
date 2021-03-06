import React, { useState, useEffect } from "react";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelper";
import "./css/address.css";

const Checkout = ({ products }) => {
  //state to store the data for checkout
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address1: " ",
    address2: " ",
    city: " ",
    state: "",
    zipCode: " ",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  //get a token by calling the API function
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  //get sub total
  const getSubTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  //get tax
  const getTax = () => {
    return getSubTotal() * 0.07;
  };

  //get total after tax
  const getTotal = () => {
    return getSubTotal() + getTax();
  };

  //display checkout option
  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign In to Checkout</button>
      </Link>
    );
  };

  //handle change for form data
  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  //get address info from the state
  let delivery_address1 = data.address1;
  let delivery_address2 = data.address2;
  let delivery_city = data.city;
  let delivery_state = "MS";
  let delivery_zip = data.zipCode;

  //checkout function to make payment
  const checkout = () => {
    //send the nonce to your server
    //nonce = data.instance.requestPaymentMethod()
    setData({ loading: true });

    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        //once you have nonce(card type, number, etc.) send nonce as
        // 'paymentMethodNonce' and total to be charged to backend
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: parseFloat(getTotal(products)).toFixed(2),
        };
        processPayment(userId, token, paymentData)
          .then((res) => {
            //create order
            const createOrderData = {
              products: products,
              transaction_id: res.transaction.id,
              amount: res.transaction.amount,
              address1: delivery_address1,
              address2: delivery_address2,
              city: delivery_city,
              state: delivery_state,
              zip: delivery_zip,
            };
            //when a payment is made, create an order history
            createOrder(userId, token, createOrderData)
              .then((res) => {
                //empty cart
                emptyCart(() => {
                  console.log("Successful payment. Emptying the cart...");
                  setTimeout("location.reload(true)", 5000);
                  setData({ loading: false, success: true });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        console.log("DropIn Error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  //display loading component
  const showLoading = (loading) => loading && <h2>Loading...</h2>;

  //display the drop in UI for payment along with address form
  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="gorm-group mb-3">
              <label className="text-muted">Address Line 1:</label>
              <input
                onChange={handleChange("address1")}
                className="form-control"
                value={data.address1 || ""}
                placeholder="Enter Address Line 1"
              />
              <label className="text-muted">Address Line 2:</label>
              <input
                onChange={handleChange("address2")}
                className="form-control"
                value={data.address2 || ""}
                placeholder="Enter Address Line 2"
              />
              <div className="row">
                <div className="col-4">
                  <label className="text-muted">City:</label>
                  <input
                    onChange={handleChange("city")}
                    className="form-control city"
                    value={data.city || ""}
                    placeholder="City"
                  />
                </div>
                <div className="col-4">
                  <label className="text-muted">State:</label>
                  <input
                    // onChange={handleChange("state")}
                    className="form-control state"
                    value="MS"
                    placeholder="MS"
                    readOnly
                  />
                  <input type="hidden" value="MS" />
                </div>
                <div className="col-4">
                  <label className="text-muted">Zip Code:</label>
                  <input
                    type="text"
                    onChange={handleChange("zipCode")}
                    className="form-control zip"
                    value={data.zipCode || ""}
                    placeholder="5 Digit Number"
                  />
                </div>
              </div>
            </div>

            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => (data.instance = instance)}
            />

            <button onClick={checkout} className="btn btn-success">
              Checkout
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  //error component
  const showError = (error) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  //success component
  const showSuccess = (success) => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        Payment was successful. Reloading...
      </div>
    );
  };

  //main
  return (
    <div className="container">
      <h2>Checkout</h2>
      <div className="small-container cart-page">
        {showLoading(data.loading)}
        {showSuccess(data.success)}
        {showError(data.error)}
        {showCheckout()}
        {/* {displayReload(data.success)} */}
      </div>
    </div>
  );
};

export default Checkout;
