
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BlogForm({ fetchBlogs, editingBlog, setEditingBlog }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState(""); // store image as URL string

  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title);
      setContent(editingBlog.content);
      setImageURL(editingBlog.image || "");
    }
  }, [editingBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = { title, content, image: imageURL }; // JSON object

    try {
      if (editingBlog) {
        await axios.put(
          `http://tshirt.beemart.com/api/blogs/${editingBlog._id}`,
          blogData
        );
        setEditingBlog(null);
      } else {
        await axios.post("https://tshirt-shop-server.vercel.app/api/blogs", blogData);
      }

      setTitle("");
      setContent("");
      setImageURL("");
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
      alert("Failed to save blog");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow mb-6 max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">
        {editingBlog ? "Edit Blog" : "Add New Blog"}
      </h2>

      <input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <textarea
        placeholder="Blog Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={5}
        required
      ></textarea>

      <input
        type="text"
        placeholder="Image URL"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
        className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        {editingBlog ? "Update Blog" : "Add Blog"}
      </button>
    </form>
  );
}
