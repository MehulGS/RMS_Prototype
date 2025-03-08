import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ResetotpMail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigator=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/v1/user/send-otp", {
        email
      });
      localStorage.setItem("resetEmail",email)
      navigator("/otp-verification")
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div>
        <div className="font-[sans-serif]">
          <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
            <div
              className="flex justify-center items-center gap-10 max-w-6xl max-md:max-w-md w-full"
              onSubmit={handleSubmit}
            >
              <form className="max-w-md md:ml-auto w-full">
                <h2
                  className="text-center text-2xl font-semibold"
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <div className="logo">Ren Basera</div>
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
                </div>
                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none h-10"
                  >
                    Send Otp
                  </button>
                </div>
                {message && <p className="text-green-600 mt-4">{message}</p>}
                {error && <p className="text-red-600 mt-4">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetotpMail;
