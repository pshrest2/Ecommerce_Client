import React, { useState, useEffect } from "react";
import { getProduct, getRelatedProducts } from "./apiCore";

import Layout from "./Layout";
import Card from "./Card";
import "./css/Product.css";

import SingleProduct from "./SingleProduct";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

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

  return (
    <Layout className="container-fluid">
      <div className="row">
        <div className="col-12 mt-5 mb-5">
          <div className="container single-product">
            {product && product.description && (
              <SingleProduct product={product} />
            )}
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-12 mb-3">
          <div className="product">
            {product && product.description && <Card product={product} />}
          </div>
        </div>
      </div> */}
      <div className="row">
        <div className="col-12 mb-3">
          <div className="container">
            <h3 className="mb-5">Related Products</h3>
            <div className="row">
              {relatedProduct.map((product, index) => (
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

export default Product;
