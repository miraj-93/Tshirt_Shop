import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const CarouselCard = ({ slide, onEdit, onDelete }) => (
  <div className="bg-white shadow rounded-lg p-4 relative">
    <img
      src={slide.imageUrl || slide.image}
      alt={slide.title}
      className="w-full h-48 object-cover rounded mb-3"
    />
    <h3 className="font-semibold text-lg mb-2">{slide.title}</h3>
    <p className="text-gray-600 mb-3">{slide.description}</p>
    <div className="flex gap-2">
      <button onClick={() => onEdit(slide)} className="text-blue-600">
        <FaEdit />
      </button>
      <button onClick={() => onDelete(slide._id)} className="text-red-600">
        <FaTrash />
      </button>
    </div>
  </div>
);

export default function CarouselManager() {
  const [carousel, setCarousel] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCarousel();
  }, []);

  const fetchCarousel = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/carousel");
      // Make sure it's an array
      const dataArray = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      setCarousel(dataArray);
    } catch (error) {
      console.error("Failed to fetch carousel:", error);
      setCarousel([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    formData.append("image", image);

    try {
      await axios.post("/api/carousel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ title: "", description: "", buttonText: "", buttonLink: "" });
      setImage(null);
      fetchCarousel();
    } catch (error) {
      console.error("Failed to add carousel:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`/api/carousel/${id}`);
      fetchCarousel();
    } catch (error) {
      console.error("Failed to delete carousel:", error);
    }
  };

  const handleEdit = (slide) => {
    // Optional: implement edit functionality
    alert(`Edit not implemented yet for ${slide.title}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Carousel</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Button Text"
          className="border p-2 w-full"
          value={form.buttonText}
          onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
        />
        <input
          type="text"
          placeholder="Button Link"
          className="border p-2 w-full"
          value={form.buttonLink}
          onChange={(e) => setForm({ ...form, buttonLink: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2"
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Carousel"}
        </button>
      </form>

      <h3 className="font-bold mb-2">Current Carousel Items</h3>
      {loading && <p>Loading carousel items...</p>}
      {Array.isArray(carousel) && carousel.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {carousel.map((item) => (
            <CarouselCard
              key={item._id}
              slide={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        !loading && <p>No carousel items found.</p>
      )}
    </div>
  );
}
