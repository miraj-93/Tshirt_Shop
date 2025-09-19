
import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogForm from '../Pages/BlogForm'
import { Link } from "react-router";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://tshirt-shop-server.vercel.app/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await axios.delete(`https://tshirt-shop-server.vercel.app/api/blogs/${id}`);
      fetchBlogs();
    }
  };

  return (
    <div className="p-6 mt-20"><Link to='/dashboard' className=" font-bold mb-6 text-center btn btn-accent">Go Back to Dashboard</Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Management</h1>
      

      {/* Blog Form */}
      <BlogForm
        fetchBlogs={fetchBlogs}
        editingBlog={editingBlog}
        setEditingBlog={setEditingBlog}
      />

      {/* Blogs Table
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4 font-medium">Title</th>
              <th className="text-left p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">{b.title}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => setEditingBlog(b)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(b._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      {/* Blogs Table */}
{/* Blogs Table */}
<div className="mt-8">
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left p-4 text-gray-700 font-semibold uppercase tracking-wider">
            Image
          </th>
          <th className="text-left p-4 text-gray-700 font-semibold uppercase tracking-wider">
            Title
          </th>
          <th className="text-left p-4 text-gray-700 font-semibold uppercase tracking-wider">
            Excerpt
          </th>
          <th className="text-left p-4 text-gray-700 font-semibold uppercase tracking-wider">
            Created At
          </th>
          <th className="text-left p-4 text-gray-700 font-semibold uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {blogs.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center py-6 text-gray-500">
              No blogs available.
            </td>
          </tr>
        ) : (
          blogs.map((b, index) => (
            <tr
              key={b._id || index}
              className="border-b hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              {/* Blog Image */}
              <td className="p-4">
                <img
                  src={b.image || "https://via.placeholder.com/80x50?text=No+Image"}
                  alt={b.title}
                  className="w-20 h-12 object-cover rounded"
                />
              </td>

              {/* Blog Title */}
              <td className="p-4 font-medium text-gray-800">{b.title}</td>

              {/* Blog Excerpt */}
              <td className="p-4 text-gray-600 line-clamp-2">
                {b.excerpt || b.content?.slice(0, 80) + "..."}
              </td>

              {/* Created At */}
              <td className="p-4 text-gray-600">
                {b.createdAt
                  ? new Date(b.createdAt).toLocaleDateString()
                  : "N/A"}
              </td>

              {/* Actions */}
              <td className="p-4 flex gap-3">
                <button
                  onClick={() => setEditingBlog(b)}
                  className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => deleteBlog(b._id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7L5 21M5 7l14 14"
                    />
                  </svg>
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>


    </div>
  );
}
