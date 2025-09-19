// // src/pages/Shop.jsx
// import React, { useState, useEffect } from "react";
// import productsData from "../data/Product.json";
// import ProductCard from "./ProductCard";
// import axios from "axios";


// const Shop = () => {
//   const [products] = useState(productsData);
//   const [ setProducts] = useState([]);

//    useEffect(() => {
//     axios.get("http://localhost:3000/api/products").then(res => setProducts(res.data));
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-8 text-center">Shop All Products</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}

//       </div>
//     </div>

    
//   );
// };

// export default Shop;


import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Shop All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;

