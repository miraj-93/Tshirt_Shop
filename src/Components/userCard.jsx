import { FaEdit, FaTrash } from "react-icons/fa";

const UserCard = ({ user, onEdit, onDelete }) => (
  <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition-shadow">
    <div>
      <p className="font-semibold">{user.name}</p>
      <p className="text-gray-600 text-sm">{user.email}</p>
      <p className="text-gray-500 text-xs">Role: {user.role}</p>
    </div>
    <div className="flex gap-2">
      <button onClick={() => onEdit(user)} className="text-blue-600 hover:text-blue-800">
        <FaEdit />
      </button>
      <button onClick={() => onDelete(user._id)} className="text-red-600 hover:text-red-800">
        <FaTrash />
      </button>
    </div>
  </div>
);

export default UserCard;
