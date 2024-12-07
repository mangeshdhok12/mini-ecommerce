import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("asc");
  const [loading, setLoading] = useState(false); // Loading state to show spinner or message
  const [error, setError] = useState(""); // Error state
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentCategory = query.get("category") || "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading state before making request
      try {
        const categoryQuery = currentCategory ? `/category/${currentCategory}` : "";
        const response = await axios.get(
          `https://fakestoreapi.com/products${categoryQuery}?sort=${sort}`
        );
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false); // Set loading state to false after request
      }
    };

    fetchProducts();
  }, [currentCategory, sort]);

  const toggleCategory = (category) => {
    const newCategory = currentCategory === category ? "" : category;
    query.set("category", newCategory);
    navigate({ search: query.toString() });
  };

  return (
    <div className="container">
      <h1>Products</h1>

      {error && <div className="error">{error}</div>} {/* Show error if any */}

      <div className="sort-filter">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="sort-select"
        >
          <option value="asc">Price (Low to High)</option>
          <option value="desc">Price (High to Low)</option>
        </select>
      </div>

      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-button ${currentCategory === category ? "active" : ""}`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div>Loading...</div> // Show loading message or spinner
      ) : (
        <div className="grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`} className="product-link">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
