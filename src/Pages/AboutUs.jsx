// src/Pages/AboutUs.jsx
import React from "react";
import { FaTshirt, FaShippingFast, FaSmile, FaTags, FaHeadset, FaSyncAlt, FaUsers, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const features = [
  {
    icon: <FaTshirt className="text-blue-600 w-10 h-10" />,
    title: "High Quality",
    description: "Our t-shirts are crafted with premium fabrics ensuring comfort and style.",
  },
  {
    icon: <FaShippingFast className="text-green-500 w-10 h-10" />,
    title: "Fast Delivery",
    description: "We ensure quick and safe delivery to your doorstep worldwide.",
  },
  {
    icon: <FaSmile className="text-yellow-500 w-10 h-10" />,
    title: "Customer Satisfaction",
    description: "Your happiness is our priority. We are here to make shopping enjoyable.",
  },
];

const services = [
  {
    icon: <FaTags className="text-purple-500 w-10 h-10" />,
    title: "Discounts & Offers",
    description: "Regular promotions to save more on your favorite t-shirts.",
  },
  {
    icon: <FaHeadset className="text-red-500 w-10 h-10" />,
    title: "24/7 Support",
    description: "Our support team is always available to assist you.",
  },
  {
    icon: <FaSyncAlt className="text-indigo-500 w-10 h-10" />,
    title: "Easy Returns",
    description: "Hassle-free returns if you are not satisfied with your purchase.",
  },
];

const stats = [
  {
    icon: <FaTshirt className="text-blue-600 w-10 h-10" />,
    label: "Products Delivered",
    value: 12500,
  },
  {
    icon: <FaChartLine className="text-green-500 w-10 h-10" />,
    label: "Products Sold",
    value: 9800,
  },
  {
    icon: <FaUsers className="text-yellow-500 w-10 h-10" />,
    label: "Site Visitors",
    value: 54000,
  },
  {
    icon: <FaSmile className="text-red-500 w-10 h-10" />,
    label: "Happy Customers",
    value: 12000,
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 px-4"
      >
        <h1 className="text-5xl font-bold text-blue-600 mb-4">About Us</h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          Welcome to <span className="font-semibold text-blue-600">TShirt-Shop</span>! 
          We deliver trendy, high-quality t-shirts with care, style, and customer satisfaction in mind.
        </p>
      </motion.div>

      {/* Features */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center text-center gap-4"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto mt-16 px-4 text-center space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
        <p className="text-gray-700 text-lg">
          At <span className="font-semibold text-blue-600">TShirt-Shop</span>, we aim to provide comfortable,
          fashionable, and affordable clothing to our customers worldwide. Your trust and satisfaction drive us to keep
          innovating and improving.
        </p>
      </motion.div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center text-center gap-4"
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Our Achievements</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center text-center gap-4"
            >
              {stat.icon}
              <h3 className="text-3xl font-bold text-blue-600">
                <CountUp end={stat.value} duration={2.5} separator="," />
              </h3>
              <p className="text-gray-700">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mt-12"
      >
        <a
          href="/shop"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 font-semibold transition-all duration-300"
        >
          Start Shopping
        </a>
      </motion.div>
    </div>
  );
};

export default AboutUs;
