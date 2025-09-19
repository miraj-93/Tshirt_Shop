// src/api.js
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data; // array of blogs
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
