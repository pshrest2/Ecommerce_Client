import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (categoryId) => () => {
    const currentCategoryId = checked.indexOf(categoryId);
    const newCategoryId = [...checked];

    if (currentCategoryId === -1) {
      newCategoryId.push(categoryId);
    } else {
      newCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCategoryId);
    handleFilters(newCategoryId);
  };

  return categories
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((category, index) => (
      <li key={index} className="list-unstyled">
        <input
          onChange={handleToggle(category._id)}
          value={checked.indexOf(category._id) === -1}
          type="checkbox"
          className="form-check-input"
        />
        <label className="form-check-label">{category.name}</label>
      </li>
    ));
};

export default Checkbox;
