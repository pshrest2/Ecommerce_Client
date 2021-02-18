import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <figure className="cards__item__pic-wrap" data-category={`$${item.price}`}>
    <img
      className="cards__item__img"
      alt={item.name}
      src={`${API}/${url}/photo/${item._id}`}
    />
  </figure>
);

export default ShowImage;
