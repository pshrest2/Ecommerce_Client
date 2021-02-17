import React from "react";
import CardItem from "./CardItem";
import "./css/Card.css";

const Card = ({ product }) => {
  return (
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem item={product} url="product" />
          </ul>
        </div>
      </div>
    </div>

    // <div className="col-3 mb-3 main-card">
    // <div className="card">
    //   <div className="card-header">{product.name}</div>
    //   <div className="card-body">
    //     <ShowImage item={product} url="product" />
    //     <p>{product.description}</p>
    //     <p>${product.price}</p>
    //     <Link to="/">
    //       <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
    //         View Product
    //       </button>
    //     </Link>

    //     <button className="btn btn-outline-warning mt-2 mb-2">
    //       Add to Cart
    //     </button>
    //   </div>
    // </div>
    // </div>
  );
};

export default Card;
