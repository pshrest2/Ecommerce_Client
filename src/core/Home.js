import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";

import Layout from "./Layout";
import Card from "./Card";
import Search from "./Search";

import "./css/Home.css";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };
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
                  <Card product={product} />
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
              {productsByArrival.map((product, index) => (
                <div key={index} className="col-4 mb-3">
                  <Card product={product} />
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
