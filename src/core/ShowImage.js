import React from "react";
import { API } from "../config";
import { Link } from "react-router-dom";

const ShowImage = ({ item, url }) => (
  <Link to={`/product/${item._id}`}>
    <figure className="cards__item__pic-wrap" data-category={`$${item.price}`}>
      <img
        className="cards__item__img"
        alt={item.name}
        src={`${API}/${url}/photo/${item._id}`}
      />
    </figure>
  </Link>
);

export default ShowImage;
