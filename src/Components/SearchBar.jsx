// import { useState } from "react";
// import { useNavigate } from "react-router";

// const SearchBar = ({ products, blogs }) => {
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     // Store results in sessionStorage or pass via route state
//     const productResults = products.filter((p) =>
//       p.name.toLowerCase().includes(query.toLowerCase())
//     );
//     const blogResults = blogs.filter((b) =>
//       b.title.toLowerCase().includes(query.toLowerCase())
//     );

//     sessionStorage.setItem("searchResults", JSON.stringify({ productResults, blogResults }));
//     navigate("/Search");
//   };

//   return (
//     <div className="flex gap-2 items-center">
//       <input
//         type="text"
//         placeholder="Search products or blogs..."
//         className="border px-4 py-2 rounded w-full md:w-64"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//       />
//       <button
//         onClick={handleSearch}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Search
//       </button>
//     </div>
//   );
// };

// export default SearchBar;
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;

    // Navigate to SearchResults page with query as state
    navigate("/search", { state: { query } });
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Search products or blogs..."
        className="border px-4 py-2 rounded w-full md:w-64"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
