import { Link, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaInfoCircle, FaShoppingCart, FaBolt } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";

const ProductCard = ({ product, onAddToCart }) => {
  const [hover, setHover] = useState(false);
  const [recent, setRecent] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // current page path

  useEffect(() => {
    axios.get("https://tshirt-shop-server.vercel.app/api/products").then((res) => {
      setRecent(res.data.slice(0, 8)); // latest 4 products
    });
  }, []);

  // Handle actions when user not logged in
  const handleAction = (action) => {
    if (!user) {
      // redirect to login and save the path to redirect back after login
      navigate("/login", { state: { from: location.pathname, action, product } });
    } else {
      if (action === "buy") {
        navigate("/checkout", { state: { product } });
      } else if (action === "cart") {
       navigate(`/product/${product._id}`, { state: { product } });
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      {/* Image */}
      <div
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />

        {/* Hover Buttons */}
        {/* Hover Buttons */}
{hover && (
  <div className="absolute inset-0 ml-40 bg-opacity-40 flex flex-col justify-center items-center gap-3 transition-opacity duration-300">
    <Link
      to={`/product/${product._id}`}
      className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded hover:bg-gray-200"
    >
      <FaInfoCircle /> 
    </Link>
    <button
      onClick={() => handleAction("buy")}
      className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
    >
      <FaBolt /> 
    </button>
    <button
      onClick={() => handleAction("cart")}
      className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
    >
      <FaShoppingCart /> 
    </button>
  </div>
)}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${Number(product.price).toFixed(2)}</p>

        {/* Buy Now & Details buttons below image */}
        <div className="mt-3 flex gap-2">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 text-center"
          >
            View Details
          </Link>
          <button
            onClick={() => handleAction("buy")}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
