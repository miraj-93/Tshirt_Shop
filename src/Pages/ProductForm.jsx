import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ fetchProducts, editingProduct, setEditingProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    sizes: [],
    colors: [],
    image: ""
  });

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (name, value) => {
    setForm({
      ...form,
      [name]: form[name].includes(value)
        ? form[name].filter((v) => v !== value)
        : [...form[name], value]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      await axios.put(`https://tshirt-shop-server.vercel.app/api/products/${editingProduct._id}`, form);
    } else {
      await axios.post("https://tshirt-shop-server.vercel.app/api/products", form);
    }
    fetchProducts();
    setEditingProduct(null);
    setForm({ name: "", price: "", description: "", sizes: [], colors: [], image: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 mb-6 w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h2>

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="border p-3 rounded w-full mb-3"
        required
      />

      {/* Price */}
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="border p-3 rounded w-full mb-3"
        required
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-3 rounded w-full mb-3"
      />

      {/* Sizes */}
      <div className="mb-3">
        <label className="font-semibold block mb-2">Available Sizes:</label>
        {["S", "M", "L", "XL"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => handleArrayChange("sizes", s)}
            className={`px-3 py-1 m-1 rounded border ${
              form.sizes.includes(s) ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Colors */}
      <div className="mb-3">
        <label className="font-semibold block mb-2">Available Colors:</label>
        {["White", "Black", "Blue", "Red"].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => handleArrayChange("colors", c)}
            className={`px-3 py-1 m-1 rounded border ${
              form.colors.includes(c) ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Image */}
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="border p-3 rounded w-full mb-3"
      />

      {form.image && (
        <img
          src={form.image}
          alt="Preview"
          className="w-40 h-40 object-cover rounded mb-3 mx-auto"
        />
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
      >
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
