// // src/Pages/Profile.jsx
// import { useEffect, useState } from "react";
// import { useAuth } from "../Context/AuthContext";
// import axios from "axios";
// import { Link } from "react-router";

// const Profile = () => {
//   const { user,userRole } = useAuth();
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
   

//   useEffect(() => {
//     if (!user) return;

//     const fetchDetails = async () => {
//       try {
//         const res = await axios.get(`/api/users/details/${user.email}`);
//         setDetails(res.data);
//       } catch (error) {
//         console.error("Error fetching user details", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [user]);

//   if (!user) {
//     return <p className="text-center mt-10">Please login to view your profile.</p>;
//   }

//   if (loading) {
//     return <p className="text-center mt-10">Loading profile...</p>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

//       {/* Profile Card */}
//       <div className="bg-white shadow rounded-lg p-6 flex gap-6">
//         <img
//           src={user.photoURL || "https://via.placeholder.com/150"}
//           alt="Profile"
//           className="w-32 h-32 rounded-full border"
//         />
//         <div>
//           <h2 className="text-xl font-semibold">{user.displayName || "Unnamed User"}</h2>
//            <p className="text-gray-600">Role: {userRole || details?.role || "N/A"}</p>
//           <p className="text-gray-600">Email: {user.email}</p>
//           <p className="text-gray-600">Mobile: {details?.mobile || "N/A"}</p>
//           <p className="text-gray-600">Registered: {details?.registerDate}</p>
//           <p className="text-gray-600">Last Visit: {details?.lastVisit}</p>
       


//         {/* ✅ Show Dashboard button if Admin */}
//           {(userRole === "admin" || details?.role === "admin") && (
//             <Link
//               to="/admin"
//               className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Go to Admin Dashboard
//             </Link>
//           )}
//         </div>
//       </div>

//       {/* Extra Details */}
//       <div className="mt-8">
//         <h3 className="text-2xl font-semibold mb-4">Your Documents</h3>
//         <ul className="list-disc pl-6">
//           {details?.documents?.map((doc, idx) => (
//             <li key={idx}>{doc}</li>
//           )) || <p>No documents found</p>}
//         </ul>
//       </div>

//       <div className="mt-8">
//         <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
//         <ul className="list-disc pl-6">
//           {details?.cart?.map((item, idx) => (
//             <li key={idx}>
//               {item.name} - {item.quantity} pcs
//             </li>
//           )) || <p>Your cart is empty</p>}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router";

const Profile = () => {
  const { user, role } = useAuth(); // ✅ use "role" not userRole
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDetails = async () => {
      try {
        const res = await axios.get(`/api/users/details/${user.email}`);
        setDetails(res.data);
      } catch (error) {
        console.error("Error fetching user details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [user]);

  if (!user) {
    return <p className="text-center mt-10">Please login to view your profile.</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* Profile Card */}
      <div className="bg-white shadow rounded-lg p-6 flex gap-6">
        <img
          src={user.photoURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full border"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.displayName || "Unnamed User"}</h2>
          <p className=" text-blue-600" >Role: {role || details?.role || "N/A"}</p>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Mobile: {details?.mobile || "N/A"}</p>
          <p className="text-gray-600">Registered: {details?.createdAt}</p>
          <p className="text-gray-600">Last Visit: {details?.lastVisit}</p>

          {/* ✅ Show Dashboard button if Admin */}
          {(role === "admin" || details?.role === "admin") && (
            <Link
              to="/dashboard"
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Admin Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Extra Details */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Your Documents</h3>
        <ul className="list-disc pl-6">
          {details?.documents?.map((doc, idx) => (
            <li key={idx}>{doc}</li>
          )) || <p>No documents found</p>}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
        <ul className="list-disc pl-6">
          {details?.cart?.map((item, idx) => (
            <li key={idx}>
              {item.name} - {item.quantity} pcs
            </li>
          )) || <p>Your cart is empty</p>}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
