

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../Pages/ProductForm";
import { Pencil, Trash2 } from "lucide-react"; // icons
import { Link } from "react-router";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div className="mt-10 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🛍️ Product Management
      </h1>
      <Link to="/dashboard" className="btn btn-accent font-bold ">
      Go Back To DashBoard
      </Link>

      {/* Product Form */}
      <div className="mb-8">
        <ProductForm
          fetchProducts={fetchProducts}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
        />
      </div>

      {/* Products Table */}
       <h2 className=" font-semibold ml-16 text-3xl text-fuchsia-600">
          Total Products: [{products.length}]
        </h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border ">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Product Image</th>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
  <img 
    src={p.image} 
    alt="product" 
    className="h-[60px] w-[100px] object-cover rounded" 
  />
</td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {p.name}
                  </td>
                  <td className="px-6 py-4 text-green-600 font-semibold">
                    ${p.price}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow"
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
