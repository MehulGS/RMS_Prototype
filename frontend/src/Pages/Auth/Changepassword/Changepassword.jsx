import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Changepassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const resetToken = localStorage.getItem("resetToken");
      const response = await axios.post("http://localhost:5000/api/v1/user/change-password", {
        resetToken,
        newPassword,
      });

      if (response.data.success) {
        localStorage.removeItem("resetToken");
        navigate("/login");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Invalid or expired token");
    }
  };

  return (
    <div className="font-[sans-serif] min-h-screen flex items-center justify-center py-6 px-4">
      <div className="flex justify-center items-center gap-10 max-w-6xl max-md:max-w-md w-full">
        <form className="max-w-md w-full" onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-semibold mb-6">Ren Basera</h2>
          <div className="space-y-4">
            <div className="relative" style={{marginBottom:"20px"}}>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-gray-100 w-full h-[55px] text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                placeholder="New Password"
                style={{ marginTop: "20px", padding: "5px" }}
              />
              <span
                className="absolute right-4 top-[40px] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="relative" style={{marginBottom:"20px"}}>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-100 w-full h-[55px] text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                placeholder="Confirm Password"
                style={{ marginTop: "20px", padding: "5px" }}
              />
              <span
                className="absolute right-4 top-[40px] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none h-10"
          >
            Change Password
          </button>
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Changepassword;