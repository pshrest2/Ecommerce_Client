import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import { isAuthenticated } from "../auth";

import Layout from "./Layout";
import Card from "./Card";
import AdminCard from "./AdminCard";
import Search from "./Search";

import "./css/Home.css";

const Home = () => {
  //state to store products ordered by most sold
  const [productsBySell, setProductsBySell] = useState([]);

  //state to store products ordered by recently added
  const [productsByArrival, setProductsByArrival] = useState([]);

  //state to store the error status
  const [error, setError] = useState(false);

  //load all products that are most sold
  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  //load all products that are recently added
  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  //main
  return (
    <Layout
      className="container-fluid"
      title="Home Page"
      description="Node React ECommerce App"
    >
      <Search />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="cards">
        <div className="cards__container">
          <div className="cards__wrapper">
            <div className="row">
              {productsByArrival.map((product, index) => (
                <div key={index} className="col-4 mb-3">
                  {isAuthenticated() && isAuthenticated().user.role === 1 ? (
                    <AdminCard
                      product={product}
                      loadArrival={loadProductsByArrival}
                      loadSell={loadProductsBySell}
                    />
                  ) : (
                    <Card product={product} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="cards">
        <div className="cards__container">
          <div className="cards__wrapper">
            <div className="row">
              {productsBySell.map((product, index) => (
                <div key={index} className="col-4 mb-3">
                  {isAuthenticated() && isAuthenticated().user.role === 1 ? (
                    <AdminCard
                      product={product}
                      loadArrival={loadProductsByArrival}
                      loadSell={loadProductsBySell}
                    />
                  ) : (
                    <Card product={product} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
