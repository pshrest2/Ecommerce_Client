import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      className="mb-3 card-img"
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
    />
  </div>
);

export default ShowImage;
