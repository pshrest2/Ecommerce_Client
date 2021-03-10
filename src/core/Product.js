import React, { useState, useEffect } from "react";
import { getProduct, getRelatedProducts } from "./apiCore";

import Layout from "./Layout";
import Card from "./Card";

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
            console.log(data);
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
    <Layout
      className="container-fluid"
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
    >
      <div className="row">
        <div className="col-6 mb-3">
          {product && product.description && <Card product={product} />}
        </div>
        <div className="col-6 mb-3">
          <h4>Related Products</h4>
          {relatedProduct.map((product, index) => (
            <div className="mb-3">
              <Card key={index} product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
