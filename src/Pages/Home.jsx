

import { useEffect, useState } from "react";
import { Link } from "react-router";
import ProductCard from "./ProductCard";
import BlogCard from "../Components/BlogsCard";
import AutoCarousel from "../Components/Carousel";
import axios from "axios";
import { fetchBlogs } from "../api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get("http://tshirt.beemart.com/api/products");
        const sortedProducts = res.data
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setProducts(sortedProducts);
        setRecentProducts(sortedProducts.slice(0, 8)); // latest 4 products
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    loadProducts();
  }, []);

  // Fetch blogs from API
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs(); // your API fetch
        const sortedBlogs = data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setBlogs(sortedBlogs);
        setRecentBlogs(sortedBlogs.slice(0, 4)); // latest 4 blogs
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
    loadBlogs();
  }, []);

  return (
    <div>
      {/* Hero Carousel */}
      <section className="bg-gray-100 py-12 text-center">
        <AutoCarousel />
      </section>

      {/* Recent Products */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Recent Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/shop"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Recent Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/blogs"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
          >
            Read All Blogs
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
