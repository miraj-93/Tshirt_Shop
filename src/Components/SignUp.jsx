import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router";

export default function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(form.email, form.password, form.name, form.mobile);
      alert("Registration successful!");
      navigate("/"); // Redirect to home after signup
    } catch (err) {
      console.error(err);
      // Handle specific Firebase errors
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already used by another user. Please use a different email.");
      } else if (err.code === "auth/invalid-email") {
        setError("The email address is invalid. Please enter a valid email.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use at least 6 characters.");
      } else {
        setError(err.message); // fallback
      }
    }
  };


  //Create Users DB

  fetch('http://localhost:3000/userprofile',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify({username:"newUser"})
  })

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
          <input
          type="number"
          name="number"
          placeholder="Your Mobile Number here"
          value={form.mobile}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        
      </form>
    </div>
  );
}
