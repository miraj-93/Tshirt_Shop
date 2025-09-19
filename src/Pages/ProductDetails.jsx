// import { useParams, useNavigate } from "react-router";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [size, setSize] = useState("");
//   const [color, setColor] = useState("");

//   useEffect(() => {
//     axios.get(`http://tshirt.beemart.com/api/products/${id}`)
//       .then(res => setProduct(res.data))
//       .catch(err => console.error(err));
//   }, [id]);

//   const addToCart = () => {
//     if (!size || !color) {
//       Swal.fire({
//         icon: "warning",
//         title: "Please select size and color!",
//       });
//       return;
//     }

//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart.push({ ...product, size, color, quantity: 1 });
//     localStorage.setItem("cart", JSON.stringify(cart));

//     // SweetAlert success
//     Swal.fire({
//       icon: 'success',
//       title: 'Added to Cart',
//       text: `${product.name || product.title} has been added to your cart!`,
//       showConfirmButton: false,
//       timer: 1500,
//     });

//     // Redirect to checkout after 1.5s
//     setTimeout(() => {
//       navigate("/checkout");
//     }, 1500);
//   };

//   if (!product) return <p>Loading...</p>;

//   const sizes = ["S", "M", "L", "XL"];
//   const colors = ["White", "Black", "Blue", "Red"];

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Product Image */}
//         <div className="md:w-1/2">
//           <img src={product.image} alt={product.name} className="w-full rounded" />
//         </div>

//         {/* Product Info */}
//         <div className="md:w-1/2">
//           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//           <p className="text-xl text-blue-600 font-semibold mb-4">${product.price}</p>
//           <p className="text-gray-700 mb-6">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet.
//           </p>

//           {/* Size Selection */}
//           <div className="mb-4">
//             <h4 className="font-semibold mb-2">Select Size:</h4>
//             <div className="flex gap-2">
//               {sizes.map((s) => (
//                 <button
//                   key={s}
//                   onClick={() => setSize(s)}
//                   className={`border px-3 py-1 rounded ${size === s ? "bg-blue-600 text-white" : ""}`}
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Color Selection */}
//           <div className="mb-6">
//             <h4 className="font-semibold mb-2">Select Color:</h4>
//             <div className="flex gap-2">
//               {colors.map((c) => (
//                 <button
//                   key={c}
//                   onClick={() => setColor(c)}
//                   className={`border px-3 py-1 rounded ${color === c ? "bg-blue-600 text-white" : ""}`}
//                 >
//                   {c}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Add to Cart */}
//           <button
//             onClick={addToCart}
//             className="bg-black text-white px-6 py-3 rounded hover:bg-blue-700"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useCart } from "../Context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [isInCart, setIsInCart] = useState(false);
  const { cart, addToCart } = useCart(); // ✅ get from context

 const [scale, setScale] = useState(1); // zoom
  const [position, setPosition] = useState({ x: 0, y: 0 }); // pan
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [flipX, setFlipX] = useState(false); // flip left/right
  const [flipY, setFlipY] = useState(false); // flip up/down
  // const [showBack, setShowBack] = useState(false); // front/back toggle

  useEffect(() => {
    axios
      .get(`https://tshirt-shop-server.vercel.app/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);

        // Check if already in cart (context cart, not localStorage)
        const exists = cart.find((item) => item._id === res.data._id);
        if (exists) setIsInCart(true);
      })
      .catch((err) => console.error(err));
  }, [id, cart]);

  const handleAddToCart = () => {
    if (!size || !color) {
      Swal.fire({
        icon: "warning",
        title: "Please select size and color!",
      });
      return;
    }

    // Prevent duplicates
    if (isInCart) {
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: "This product is already in your cart!",
      });
      return;
    }

    // ✅ Use context addToCart
    addToCart({ ...product, size, color, quantity: 1 });
    setIsInCart(true);

    // SweetAlert success
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${product.name || product.title} has been added to your cart!`,
      showConfirmButton: false,
      timer: 1500,
    });

    // Redirect to checkout
    setTimeout(() => {
      navigate("/checkout");
    }, 1500);
  };

  if (!product) return <p>Loading...</p>;

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["White", "Black", "Blue", "Red"];


  // Zoom with wheel
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.2, 4)); // max 4x
    } else {
      setScale((prev) => Math.max(prev - 0.2, 2)); // min 1x
    }
  };

  // Dragging (pan)
  const handleMouseDown = (e) => {
    setDragging(true);
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - start.x,
        y: e.clientY - start.y,
      });
    }
  };

  const handleMouseUp = () => setDragging(false);


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
      
        {/* <div
      className="md:w-1/2 overflow-hidden border rounded"
      onWheel={handleWheel}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded transition-transform duration-200 ease-in-out cursor-zoom-in"
        style={{ transform: `scale(${scale})` }}
      />
    </div> */}
     <div className="md:w-1/2 flex flex-col gap-2">
      {/* Image Viewer */}
      <div
        className="relative overflow-hidden border rounded h-[500px] bg-black/5"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
        // src={showBack ? product.backImage : product.frontImage}
          src={product.image}
          alt={product.name}
          className="select-none cursor-grab active:cursor-grabbing"
          style={{
            transform: `
              translate(${position.x}px, ${position.y}px)
              scale(${scale})
              scaleX(${flipX ? -1 : 1})
              scaleY(${flipY ? -1 : 1})
            `,
            transition: dragging ? "none" : "transform 0.2s ease",
          }}
          draggable="false"
        />
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        
        <button
          onClick={() => setFlipX((prev) => !prev)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Flip Left/Right
        </button>
        <button
          onClick={() => setFlipY((prev) => !prev)}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Flip Up/Down
        </button>
        <button
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
            setFlipX(false);
            setFlipY(false);
          }}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>


        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-blue-600 font-semibold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 mb-6">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Select Size:</h4>
            <div className="flex gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`border px-3 py-1 rounded ${
                    size === s ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Select Color:</h4>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`border px-3 py-1 rounded ${
                    color === c ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`px-6 py-3 rounded text-white ${
              isInCart
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-blue-700"
            }`}
          >
            {isInCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

