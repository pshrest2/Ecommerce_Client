import React, { useState } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  //main
  //display radio buttons for all price ranges that we created
  return prices.map((price, index) => (
    <div key={index}>
      <input
        onChange={handleChange}
        name={price}
        value={`${price._id}`}
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{price.name}</label>
    </div>
  ));
};

export default RadioBox;
