import { useEffect, useState } from "react";
import { Link } from "react-router";
const images = [
  "https://i.ibb.co.com/2fkL4Cw/banner.jpg",
  "https://i.ibb.co.com/TDxT4f32/lawer-7.webp",
  "https://i.ibb.co.com/wZhBZgW3/lawer-9.jpg",
  "https://i.ibb.co.com/5t9S65g/Banner-min.jpg"
];

export default function AutoCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[300px] md:h-[400px] overflow-hidden">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background image */}
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Overlay only when active */}
          {index === current && (
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
              <h1 className="text-4xl sm:text-2xl md:text-4xl font-bold mb-4 text-white">
                Welcome to <span className="text-blue-400">TShirtShop</span>
              </h1>
              <p className="text-gray-200 mb-6">
                Premium quality T-shirts at unbeatable prices.
              </p>
              <Link
                to="/shop"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
      ))}

      {/* Navigation buttons */}
      <div className="absolute left-5 right-5 top-1/2 flex justify-between -translate-y-1/2 z-20">
        <button
          onClick={prevSlide}
          className="btn btn-circle bg-white/70 hover:bg-white"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="btn btn-circle bg-white/70 hover:bg-white"
        >
          ❯
        </button>
      </div>
    </div>
  );
}