
import { Link } from "react-router";
import { FaClock, FaArrowRight } from "react-icons/fa";

const BlogCard = ({ blog }) => {
  if (!blog) return null;

  // Format the createdAt date
  const dateObj = new Date(blog.createdAt);
  const formattedDate = `${dateObj.getFullYear()}/${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${dateObj.getDate().toString().padStart(2, "0")}`;
const formattedTime = `${dateObj.getHours().toString().padStart(2, "0")}:${dateObj
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${dateObj.getSeconds().toString().padStart(2, "0")}`;
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
      {/* Blog Image */}
      {blog.image ? (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition-colors duration-300">
          {blog.title}
        </h3>

        <p className="text-sm flex items-center gap-2 mb-3 text-blue-300">
          <FaClock /> Posted: {formattedDate} {formattedTime}
        </p>

        <p className="text-gray-700 text-sm mb-4">
          {blog.content ? blog.content.substring(0, 120) + "..." : "No content available"}
        </p>

        <Link
          to={`/blogs/${blog._id}`}
          className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
        >
          Read More <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

