// import { Link } from "react-router";

// export default function AdminDashboard() {
//   return (
//     <div className="p-6 mt-[120px]">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Link to="/admin/products" className="bg-blue-500 text-white p-4 rounded">
//           Manage Products
//         </Link>
//         <Link to="/admin/blogs" className="bg-green-500 text-white p-4 rounded">
//           Manage Blogs
//         </Link>
//         <Link to="/admin/carousel" className="bg-purple-500 text-white p-4 rounded">
//           Manage Carousel
//         </Link>
//         <Link to="/admin/orders" className="bg-yellow-500 text-white p-4 rounded">
//           View Orders
//         </Link>
//         <Link to="/admin/users" className="bg-red-500 text-white p-4 rounded">
//           View Users
//         </Link>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../Context/AuthContext"; // adjust path
import axios from "axios";

export default function AdminDashboard() {
  const { user, role, fetchUserRole } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState(user?.photoURL || "");
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    role: role || "user",
    phone: user?.phoneNumber || "",
    address: user?.address || "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("displayName", formData.displayName);
      data.append("email", formData.email);
      data.append("role", formData.role);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      if (formData.photo) data.append("photo", formData.photo);

await axios.put(`https://tshirt-shop-server.vercel.app/api/users/uid/${user.uid}`, data);

    alert("User info updated successfully!");
    setIsEditing(false);
    fetchUserRole(user.email); // refresh role info
  } catch (err) {
    console.error(err);
    alert("Failed to update user info");
  }
};
  return (
    <div className="p-6 mt-[120px]">
      {/* User Info Section */}
      {user && (
        <div className="mb-8 p-6 bg-gray-50 rounded-xl shadow flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src={preview || "https://i.ibb.co/7CQVJNm/default-avatar.png"}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{user.displayName || "Unnamed User"}</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Role: {role || "N/A"}</p>
            <p className="text-gray-600">Phone: {formData.phone || "N/A"}</p>
            <p className="text-gray-600">Address: {formData.address || "N/A"}</p>
            <p className="text-gray-600">
              Registered: {user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Edit Info
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col gap-4"
          >
            <h2 className="text-xl font-bold">Edit User Info</h2>

            <div className="flex justify-center mb-2">
              <img
                src={preview || "https://i.ibb.co/7CQVJNm/default-avatar.png"}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
            </div>

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Display Name"
              className="border p-2 rounded w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-2 rounded w-full"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 px-4 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Admin Dashboard Links */}
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/products" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 text-center">Manage Products</Link>
        <Link to="/admin/blogs" className="bg-green-500 text-white p-4 rounded hover:bg-green-600 text-center">Manage Blogs</Link>
        <Link to="/admin/carousel" className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600 text-center">Manage Carousel</Link>
        <Link to="/admin/orders" className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600 text-center">View Orders</Link>
        <Link to="/admin/users" className="bg-red-500 text-white p-4 rounded hover:bg-red-600 text-center">View Users</Link>
      </div>
    </div>
  );
}
