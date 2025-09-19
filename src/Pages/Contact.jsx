
import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Data:", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 text-blue-600"
      >
        Contact Us
      </motion.h1>

      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-white shadow-lg rounded-xl p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 font-semibold transition duration-200"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Admin Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-white shadow-lg rounded-xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Office</h2>
          <p className="text-gray-700">
            We are here to assist you! Reach out via email, phone, or visit our office.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>123 Fashion Street, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-blue-600" />
              <span>support@tshirt-shop.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaPhone className="text-blue-600" />
              <span>+880 123 456 789 | +880 987 654 321</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Office Hours</h3>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
