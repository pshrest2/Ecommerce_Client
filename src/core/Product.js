import React, { useState, useEffect } from "react";
import { getProduct, getRelatedProducts } from "./apiCore";

import Layout from "./Layout";
import AdminCard from "./AdminCard";
import Card from "./Card";
import "./css/Product.css";
import { isAuthenticated } from "../auth";
import SingleProduct from "./SingleProduct";
import AdminSingleProduct from "./AdminSingleProduct";

const Product = (props) => {
  //state to store single product info
  const [product, setProduct] = useState({});

  //state to store related products
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  //load the single product by calling the getProduct API
  const loadSingleProduct = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);

        //fetch related products
        getRelatedProducts(data._id).then((data) => {
          if (data.error) {
            setError(error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  //main
  return (
    <Layout className="container-fluid">
      <div className="row">
        <div className="col-12 mt-5 mb-5">
          <div className="container single-product">
            {product && product.description ? (
              isAuthenticated() && isAuthenticated().user.role === 1 ? (
                <AdminSingleProduct product={product} />
              ) : (
                <SingleProduct product={product} />
              )
            ) : null}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-3">
          <div className="container">
            <h3 className="mb-5">Related Products</h3>
            <div className="row">
              {relatedProduct.map((product, index) => (
                <div key={index} className="col-4 mb-3">
                  {isAuthenticated() && isAuthenticated().user.role === 1 ? (
                    <AdminCard product={product} />
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

export default Product;
