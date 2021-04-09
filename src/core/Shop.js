import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import AdminCard from "./AdminCard";
import { isAuthenticated } from "../auth";

import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import Search from "./Search";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [size, setSize] = useState(0);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let totalSkip = skip + limit;

    getFilteredProducts(totalSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(totalSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load More
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let i in data) {
      if (data[i]._id === parseInt(value)) array = data[i].array;
    }
    return array;
  };

  return (
    <Layout
      className="container-fluid"
      title="Shop Page"
      description="Search and find products by your choice"
    >
      <div className="row">
        <div className="col-2">
          <h4>Filter by Categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Filter by Price Range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>

        <div className="col-10">
          <h2 className="mb-4">Products</h2>
          <Search />
          <div className="row">
            {filteredResults.map((product, index) => (
              <div key={index} className="col-3 mb-3">
                {isAuthenticated() && isAuthenticated().user.role === 1 ? (
                  <AdminCard product={product} />
                ) : (
                  <Card product={product} />
                )}
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
