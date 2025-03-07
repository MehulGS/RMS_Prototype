import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token); // Store token in localStorage
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div>
        <div className="font-[sans-serif]">
          <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
            <div className="flex justify-center items-center gap-10 max-w-6xl max-md:max-w-md w-full">
              <form onSubmit={handleSubmit} className="max-w-md md:ml-auto w-full">
                <h2
                  className="text-center text-2xl font-semibold"
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <div className="logo">ZEESH</div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </h2>
                <div className="space-y-4" style={{ marginTop: "20px" }}>
                  <div>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-100 w-full h-[55px] text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                      placeholder="Email address"
                      style={{ marginTop: "20px", padding: "5px" }}
                    />
                  </div>
                  <div>
                    <input
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-gray-100 w-full h-[55px] text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                      placeholder="Password"
                      style={{ marginTop: "20px", padding: "5px" }}
                    />
                  </div>
                  <div
                    className="flex flex-wrap items-center justify-between gap-4"
                    style={{ marginTop: "20px" }}
                  >
                    <div className="text-sm">
                      <Link
                        to="/reset-password"
                        className="text-blue-600 hover:text-blue-500 font-semibold"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none h-10"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
