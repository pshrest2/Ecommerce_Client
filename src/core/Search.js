import React, { useState, useEffect } from "react";
import { getCategories, listProductsQueried } from "./apiCore";
import Card from "./Card";
import "./css/Search.css";
import "./css/Card.css";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  //load all categories
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  const { categories, category, search, results, searched } = data;

  useEffect(() => {
    loadCategories();
  }, []);

  //get searched products
  const searchData = () => {
    if (search) {
      //call listProductsQueried API to get products that is searched
      listProductsQueried({
        search: search || undefined,
        category: category,
      }).then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          setData({
            ...data,
            results: res,
            searched: true,
          });
        }
      });
    }
  };

  //call serachData function when clicked submit button
  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  //serach message to display
  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `${results.length} items found`;
    }
    if (searched && results.length <= 0) {
      return "Sorry no items found";
    }
  };

  //searched products componend
  const searchedProduct = (results = []) => (
    <div className="cards">
      <h4 className="mt-4 mb-4">{searchMessage(searched, results)}</h4>
      <div className="row">
        {results.map((product, index) => (
          <div key={index} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );

  //search form component
  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text test">
        <div className="input-group input-group-lg">
          <div className="input-group-append dropdown">
            <select className="btn" onChange={handleChange("category")}>
              <option value="All">Pick a Category</option>
              {categories
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <input
            onChange={handleChange("search")}
            type="search"
            className="form-control form_input"
            placeholder="Search by name"
          />
        </div>

        <div className="btn input-group-append">
          <button className="btn btn-warning">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </span>
    </form>
  );

  // main
  return (
    <div className="row">
      <div className="container mb-2">{searchForm()}</div>
      <div className="container-fluid mb-2">{searchedProduct(results)}</div>
    </div>
  );
};

export default Search;
