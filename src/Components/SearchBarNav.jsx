import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length > 1) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`/api/search?query=${query}`);
          setResults(data); // Expected format: [{ id, title, type: 'product'|'blog' }]
        } catch (error) {
          console.error("Search error:", error);
        }
      };
      fetchData();
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (item) => {
    if (item.type === "product") {
      navigate(`/product/${item.id}`);
    } else if (item.type === "blog") {
      navigate(`/blog/${item.id}`);
    }
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search products, blogs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      {results.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto z-50">
          {results.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.title} <span className="text-gray-500 text-sm">({item.type})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
