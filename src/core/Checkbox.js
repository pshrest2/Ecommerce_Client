import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  //state to store all the checked categories
  const [checked, setChecked] = useState([]);

  const handleToggle = (categoryId) => () => {
    //get the current category id
    const currentCategoryId = checked.indexOf(categoryId);

    //set the new category id to checked
    const newCategoryId = [...checked];

    //if no current category id then add the category id the the new category id array
    //this is equivalent to clicking the check box
    if (currentCategoryId === -1) {
      newCategoryId.push(categoryId);
    } else {
      //if the category id is already present, remove it
      //this is equivalent to unclicking the check box
      newCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCategoryId);
    handleFilters(newCategoryId);
  };

  //main
  //sort the categories by name
  //for each category, add a check box besides it for filtering
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
