// import { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import BlogCard from "../Components/BlogsCard";


// const SearchResults = () => {
//   const [results, setResults] = useState({ productResults: [], blogResults: [] });

//   useEffect(() => {
//     const data = JSON.parse(sessionStorage.getItem("searchResults")) || { productResults: [], blogResults: [] };
//     setResults(data);
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h2 className="text-2xl font-bold mb-6">Search Results</h2>

//       <h3 className="text-xl font-semibold mb-4">Products</h3>
//       {results.productResults.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {results.productResults.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       ) : (
//         <p>No products found.</p>
//       )}

//       <h3 className="text-xl font-semibold mt-10 mb-4">Blogs</h3>
//       {results.blogResults.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {results.blogResults.map((blog) => (
//             <BlogCard key={blog.id} blog={blog} />
//           ))}
//         </div>
//       ) : (
//         <p>No blogs found.</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;


// import { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import BlogCard from "../Components/BlogsCard";

// const SearchResults = () => {
//   const [results, setResults] = useState({ productResults: [], blogResults: [] });

//   useEffect(() => {
//     const data = JSON.parse(sessionStorage.getItem("searchResults")) || {
//       productResults: [],
//       blogResults: []
//     };

//     // Sort search results by updatedAt (latest first)
//     const sortedProductResults = data.productResults.sort(
//       (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
//     );
//     const sortedBlogResults = data.blogResults.sort(
//       (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
//     );

//     setResults({
//       productResults: sortedProductResults,
//       blogResults: sortedBlogResults
//     });
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h2 className="text-2xl font-bold mb-6">Search Results</h2>

//       {/* Products */}
//       <h3 className="text-xl font-semibold mb-4">Products</h3>
//       {results.productResults.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {results.productResults.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       ) : (
//         <p>No products found.</p>
//       )}

//       {/* Blogs */}
//       <h3 className="text-xl font-semibold mt-10 mb-4">Blogs</h3>
//       {results.blogResults.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {results.blogResults.map((blog) => (
//             <BlogCard key={blog._id} blog={blog} />
//           ))}
//         </div>
//       ) : (
//         <p>No blogs found.</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;

import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import ProductCard from "./ProductCard";
import BlogCard from "../Components/BlogsCard";

const SearchResults = () => {
  const location = useLocation();
  const { query } = location.state || "";
  const [results, setResults] = useState({ productResults: [], blogResults: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  if (!query) return;

  const fetchResults = async () => {
    try {
      setLoading(true);
      const [productRes, blogRes] = await Promise.all([
        axios.get(`https://tshirt-shop-server.vercel.app/api/products/search?q=${encodeURIComponent(query)}`),
        axios.get(`https://tshirt-shop-server.vercel.app/api/blogs/search?q=${encodeURIComponent(query)}`)
      ]);

      // Make sure we are working with arrays
      const productsArray = Array.isArray(productRes.data)
        ? productRes.data
        : productRes.data.products || []; // adjust if your API returns { products: [...] }

      const blogsArray = Array.isArray(blogRes.data)
        ? blogRes.data
        : blogRes.data.blogs || []; // adjust if API returns { blogs: [...] }

      // Sort latest first
      const sortedProducts = productsArray.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      const sortedBlogs = blogsArray.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );

      setResults({ productResults: sortedProducts, blogResults: sortedBlogs });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  fetchResults();
}, [query]);


  if (loading) return <p className="text-center py-10">Searching...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>

      {/* Products */}
      <h3 className="text-xl font-semibold mb-4">Products</h3>
      {results.productResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.productResults.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}

      {/* Blogs */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Blogs</h3>
      {results.blogResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.blogResults.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default SearchResults;

