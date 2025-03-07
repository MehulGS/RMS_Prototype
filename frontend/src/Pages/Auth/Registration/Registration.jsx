import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    email: "",
    phone: "",
    role: "cheif",
    password: "",
    cpassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.cpassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        {
          name: `${formData.name} ${formData.lname}`,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        }
      );

      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2
          className="text-center text-2xl font-semibold"
          style={{ marginBottom: "20px", marginTop: "20px" }}
        >
          <div className="logo">ZEESH</div>
        </h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4" style={{ padding: "20px" }}>
            <input
              type="text"
              name="name"
              placeholder="First Name"
              className="w-full p-2 mb-3 border rounded"
              onChange={handleChange}
              required
              style={{ padding: "5px", display: "flex", textAlign: "center" }}
            />
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              className="w-full p-2 mb-3 border rounded"
              onChange={handleChange}
              required
              style={{ padding: "5px", display: "flex", textAlign: "center" }}
            />
          </div>
          <div className="flex gap-4" style={{ padding: "20px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 mb-3 border rounded"
              onChange={handleChange}
              required
              style={{ padding: "5px", display: "flex", textAlign: "center" }}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-2 mb-3 border rounded"
              onChange={handleChange}
              required
              style={{ padding: "5px", display: "flex", textAlign: "center" }}
            />
          </div>
          <div className="flex gap-4" style={{ padding: "20px" }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-3 border rounded"
              onChange={handleChange}
              required
              style={{ padding: "5px", display: "flex", textAlign: "center" }}
            />
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              className="w-full p-2 mb-3 border rounded"
              onChange={handleChange}
              required
              style={{ padding: "5px", display: "flex", textAlign: "center" }}
            />
          </div>
          <div
            className="flex w-full justify-center"
            style={{ marginBottom: "20px" }}
          >
            <div className="px-5 mb-3 w-[410px]">
              <select
                name="role"
                className="w-full p-2 border rounded"
                value={formData.role}
                onChange={handleChange}
                style={{ padding: "5px", display: "flex", textAlign: "center" }}
              >
                <option value="chief">Chief (Default)</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>
          <div
            className="flex w-full justify-center"
            style={{ marginBottom: "20px" }}
          >
            <button
              type="submit"
              className="w-[50%] bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition h-10"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
