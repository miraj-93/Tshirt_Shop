
import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { fetchBlogs } from "../api";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      const data = await fetchBlogs();
      const selectedBlog = data.find((b) => String(b._id) === String(id));
      setBlog(selectedBlog);
    };
    loadBlog();
  }, [id]);

  if (!blog)
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Blog not found
        </h2>
        <Link
          to="/blogs"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Blogs
        </Link>
      </div>
    );

  // Format createdAt to show date & time
  const dateObj = new Date(blog.createdAt);
  const formattedDate = `${dateObj.getFullYear()}/${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${dateObj.getDate().toString().padStart(2, "0")}`;
  const formattedTime = `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${dateObj.getSeconds().toString().padStart(2, "0")}`;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        to="/blogs"
        className="flex items-center gap-2 text-blue-600 mb-6 font-semibold"
      >
        <FaArrowLeft /> Back to Blogs
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        {blog.title}
      </h1>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full max-h-96 object-cover rounded mb-6"
        />
      )}

      <p className="text-gray-500 mb-4">
        Posted: {formattedDate} {formattedTime}
      </p>

      <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
        {blog.content || "No content available"}
      </p>
    </div>
  );
};

export default BlogDetails;


