// // import { Link, NavLink, useNavigate } from "react-router";
// // import SearchBar from "../Components/SearchBar";
// // import { useEffect, useState, useContext } from "react";
// // import { AuthContext } from "../Context/AuthContext";


// // const Navbar = () => {
// //   const [products, setProducts] = useState([]);
// //   const [blogs, setBlogs] = useState([]);
// //   const { user, logout } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetch("/Product.json")
// //       .then((res) => res.json())
// //       .then((data) => setProducts(data));

// //     fetch("/Blogs.json")
// //       .then((res) => res.json())
// //       .then((data) => setBlogs(data));
// //   }, []);

// //   const navLinks = [
// //     { name: "Home", path: "/" },
// //     { name: "Shop", path: "/shop" },
// //     { name: "Blogs", path: "/blogs" },
// //     { name: "Cart", path: "/cart" },
// //   ];

// //   const handleLogout = async () => {
// //     try {
// //       await logout();
// //       navigate("/");
// //     } catch (error) {
// //       console.error("Logout failed", error);
// //     }
// //   };

// //   return (
// //     <nav className="bg-white shadow-md fixed w-full z-10 top-0">
// //       <div className="container mx-auto flex justify-between items-center px-4 py-3">
        
// //         {/* Logo */}
// //         <Link to="/" className="text-2xl font-bold text-blue-600">
// //           TShirt<span className="text-gray-800">Shop</span>
// //         </Link>

// //         {/* Menu Links */}
// //         <ul className="hidden md:flex gap-6">
// //           {navLinks.map((link) => (
// //             <li key={link.path}>
// //               <NavLink
// //                 to={link.path}
// //                 className={({ isActive }) =>
// //                   isActive
// //                     ? "text-green-400 font-semibold"
// //                     : "text-gray-700 hover:text-blue-500"
// //                 }
// //               >
// //                 {link.name}
// //               </NavLink>
// //             </li>
// //           ))}
// //         </ul>

// //         {/* Search Bar */}
// //         <div className="hidden md:flex items-center">
// //           <SearchBar products={products} blogs={blogs} />
// //         </div>

// //         {/* Auth Buttons / User Profile */}
// //         <div className="hidden md:flex gap-4 items-center">
// //           {!user ? (
// //             <>
// //               <Link
// //                 to="/login"
// //                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //               >
// //                 Login
// //               </Link>
// //               <Link
// //                 to="/signup"
// //                 className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
// //               >
// //                 Sign Up
// //               </Link>
// //             </>
// //           ) : (
// //             <>
// //               <Link to="/userprofile" className="flex items-center gap-2">
// //                 {user.photoURL && (
// //                   <img
// //                     src={user.photoURL}
// //                     alt="User"
// //                     className="w-8 h-8 rounded-full border"
// //                   />
// //                 )}
// //                 <span className="text-blue-600 text-2xl">{user.displayName || "Profile"}</span>
// //               </Link>
// //               <button
// //                 onClick={handleLogout}
// //                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
// //               >
// //                 Logout
// //               </button>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import { Link, NavLink, useNavigate } from "react-router";
// import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../Context/AuthContext";
// import SearchBar from "../Components/SearchBar";
// import { FaBars, FaTimes, FaUserCircle, FaHome, FaShoppingCart, FaBlog } from "react-icons/fa";
// import { useCart } from "../Context/CartContext";

// const Navbar = () => {
//   const [products, setProducts] = useState([]);
//   const [blogs, setBlogs] = useState([]);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const { cart } = useCart();

//   useEffect(() => {
//     fetch("/Product.json")
//       .then((res) => res.json())
//       .then((data) => setProducts(data));

//     fetch("/Blogs.json")
//       .then((res) => res.json())
//       .then((data) => setBlogs(data));
//   }, []);

//   const navLinks = [
//     { name: "Home", path: "/", icon: <FaHome /> },
//     { name: "Shop", path: "/shop", icon: <FaShoppingCart /> },
//     { name: "Blogs", path: "/blogs", icon: <FaBlog /> },
//     { name: "Cart", path: "/cart", icon: <FaShoppingCart /> },
//   ];

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };

//   return (
//     <nav className="bg-white shadow-md fixed w-full z-50 top-0">
//       <div className="container mx-auto flex justify-between items-center px-4 py-3">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-blue-600">
//           TShirt<span className="text-gray-800">Shop</span>
//         </Link>

//         {/* Desktop Links */}
//         <ul className="hidden md:flex gap-6 items-center">
//           {navLinks.map((link) => (
//             <li key={link.path}>
//               <NavLink
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-1 ${
//                     isActive ? "text-green-500 font-semibold" : "text-gray-700 hover:text-blue-500"
//                   }`
//                 }
//               >
//                 {link.icon}
//                 {link.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         {/* Search Bar */}
//         <div className="hidden md:flex items-center">
//           <SearchBar products={products} blogs={blogs} />
//         </div>

//         {/* Desktop Auth/Profile */}
//         <div className="hidden md:flex gap-4 items-center">
//           {!user ? (
//             <>
//               <Link
//                 to="/login"
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
//               >
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link to="/userprofile" className="flex items-center gap-2">
//                 {user.photoURL ? (
//                   <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border" />
//                 ) : (
//                   <FaUserCircle size={32} className="text-gray-700" />
//                 )}
//                 <span className="text-blue-600 font-semibold">{user.displayName || "Profile"}</span>
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="md:hidden flex items-center">
//           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//             {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white shadow-md w-full absolute top-full left-0 p-4 flex flex-col gap-4">
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               {link.icon}
//               {link.name}
//             </NavLink>
//           ))}

//           {!user ? (
//             <>
//               <Link
//                 to="/login"
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/userprofile"
//                 className="flex items-center gap-2"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 {user.photoURL ? (
//                   <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border" />
//                 ) : (
//                   <FaUserCircle size={32} className="text-gray-700" />
//                 )}
//                 <span className="text-blue-600 font-semibold">{user.displayName || "Profile"}</span>
//               </Link>
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setMobileMenuOpen(false);
//                 }}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { Link, NavLink, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

import SearchBar from "../Components/SearchBar";
import { FaBars, FaTimes, FaUserCircle, FaHome, FaShoppingCart, FaBlog } from "react-icons/fa";
import { useCart } from "../Context/CartContext";

const Navbar = () => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cart, resetCart } = useCart();

  useEffect(() => {
    fetch("/Product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("/Blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Shop", path: "/shop", icon: <FaShoppingCart /> },
    { name: "Blogs", path: "/blogs", icon: <FaBlog /> },
    { name: "Cart", path: "/cart", icon: <FaShoppingCart /> },
  ];

  const handleLogout = async () => {
    try {
      await logout();
       resetCart();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const renderCartLink = () => (
    <Link to="/cart" className="relative flex items-center gap-1">
      <FaShoppingCart />
      <span>Cart</span>
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {cart.length}
        </span>
      )}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TShirt<span className="text-gray-800">Shop</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <li key={link.path}>
              {link.name === "Cart" ? (
                renderCartLink()
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1 ${
                      isActive ? "text-green-500 font-semibold" : "text-gray-700 hover:text-blue-500"
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Search Bar */}
        <div className="hidden md:flex items-center">
          <SearchBar products={products} blogs={blogs} />
        </div>

        {/* Desktop Auth/Profile */}
        <div className="hidden md:flex gap-4 items-center">
          {!user ? (
            <>
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
              <Link to="/signup" className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/userprofile" className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border" />
                ) : (
                  <FaUserCircle size={32} className="text-gray-700" />
                )}
                <span className="text-blue-600 font-semibold">{user.displayName || "Profile"}</span>
              </Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md w-full absolute top-full left-0 p-4 flex flex-col gap-4">
          {navLinks.map((link) =>
            link.name === "Cart" ? (
              <div key={link.path} onClick={() => setMobileMenuOpen(false)}>
                {renderCartLink()}
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </NavLink>
            )
          )}

          {!user ? (
            <>
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/userprofile" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border" />
                ) : (
                  <FaUserCircle size={32} className="text-gray-700" />
                )}
                <span className="text-blue-600 font-semibold">{user.displayName || "Profile"}</span>
              </Link>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;


