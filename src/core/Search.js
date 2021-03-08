import React, { useState, useEffect } from "react";
import { getCategories, listProductsQueried } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

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

  const searchData = () => {
    if (search) {
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

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `${results.length} items found`;
    }
    if (searched && results.length <= 0) {
      return "Sorry no items found";
    }
  };

  const searchedProduct = (results = []) => (
    <div>
      <h4 className="mt-4 mb-4">{searchMessage(searched, results)}</h4>
      <div className="row">
        {results.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </div>
  );

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-append">
            <select className="btn mr-2" onChange={handleChange("category")}>
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
            className="form-control"
            placeholder="Search by name"
          />
        </div>

        <div className="btn input-group-append">
          <button className=" btn btn-warning">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-5">{searchForm()}</div>
      <div className="container-fluid mb-5">{searchedProduct(results)}</div>
    </div>
  );
};

export default Search;
