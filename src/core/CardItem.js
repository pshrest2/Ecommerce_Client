import React from "react";
import { Link } from "react-router-dom";
import { API } from "../config";

function CardItem({ item, url }) {
  return (
    <>
      <li className="cards__item">
        <Link className="cards__item__link">
          <figure
            className="cards__item__pic-wrap"
            data-category={`$${item.price}`}
          >
            <img
              className="cards__item__img"
              alt={item.name}
              src={`${API}/${url}/photo/${item._id}`}
            />
          </figure>
          <div className="cards__item__info">
            <h5 className="cards__item__text">{item.name}</h5>
            <p className="cards__item__text_description">{item.description}</p>
          </div>
          <button className="btn btn-outline-warning">Add to Cart</button>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
