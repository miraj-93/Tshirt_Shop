// // import { useEffect, useState } from "react";
// // import axios from "axios"; // or use Firebase
// // import UserCard from "../Components/userCard";
// // import { FaPlus } from "react-icons/fa";

// // const AdminUsers = () => {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   // Fetch users from backend (replace with your endpoint or Firebase query)
// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const res = await axios.get("/api/users"); // your API endpoint
// //         console.log("Users API Response:", res.data);
// //         setUsers(res.data.users);
// //       } catch (err) {
// //         console.error(err);
// //         setError("Failed to fetch users.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchUsers();
// //   }, []);

// //   const handleEdit = (user) => {
// //     // redirect to edit page or open modal
// //     alert(`Edit user: ${user.name}`);
// //   };

// //   const handleDelete = async (userId) => {
// //     if (window.confirm("Are you sure you want to delete this user?")) {
// //       try {
// //         await axios.delete(`/api/users/${userId}`);
// //         setUsers(users.filter((u) => u._id !== userId));
// //       } catch (err) {
// //         console.error(err);
// //         setError("Failed to delete user.");
// //       }
// //     }
// //   };

// //   if (loading) return <p className="text-center py-10">Loading users...</p>;
// //   if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-3xl font-bold mb-6">User Management</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {users.map((user) => (
// //           <UserCard
// //             key={user._id}
// //             user={user}
// //             onEdit={handleEdit}
// //             onDelete={handleDelete}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminUsers;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import UserCard from "../Components/userCard";

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get("/api/users");
//         console.log("Users API Response:", res.data);

//         // Adjust according to your backend response
//         if (Array.isArray(res.data)) {
//           setUsers(res.data);
//         } else if (res.data.users) {
//           setUsers(res.data.users);
//         } else {
//           setUsers([]);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch users.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleEdit = (user) => {
//     alert(`Edit user: ${user.name}`);
//   };

//   const handleDelete = async (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await axios.delete(`/api/users/${userId}`);
//         setUsers((prev) => prev.filter((u) => u._id !== userId));
//       } catch (err) {
//         console.error(err);
//         setError("Failed to delete user.");
//       }
//     }
//   };

//   if (loading) return <p className="text-center py-10">Loading users...</p>;
//   if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">User Management</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {Array.isArray(users) && users.length > 0 ? (
//           users.map((user) => (
//             <UserCard
//               key={user._id}
//               user={user}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//           ))
//         ) : (
//           <p className="text-center text-gray-500 col-span-full">
//             No users found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;


import { useEffect, useState } from "react";
import { db } from "../Utils/firebase.config";
 // your firebase config
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // reference to users collection
    const usersRef = collection(db, "users");
    // query for ordering users by createdAt (optional)
    const q = query(usersRef, orderBy("createdAt", "desc"));

    // real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });

    // cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <table className="w-full border rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition">
              <td className="p-3 border">{user.name}</td>
              <td className="p-3 border">{user.email}</td>
              <td className="p-3 border">
                {user.createdAt?.toDate().toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
