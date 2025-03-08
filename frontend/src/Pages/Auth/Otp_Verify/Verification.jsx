import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Verification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem("resetEmail");
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/verify-otp",
        { email, otp }
      );

      if (response.data.success) {
        localStorage.setItem("resetToken", response.data.resetToken);
        navigator("/update-password"); 
      } else {
        setError(response.data.message);
      }
    } catch (err) {
        console.log(err)
      setError("Invalid or expired OTP");
    }
  };

  return (
    <>
      <div>
        <div className="font-[sans-serif]">
          <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
            <div className="flex justify-center items-center gap-10 max-w-6xl max-md:max-w-md w-full">
              <form
                className="max-w-md md:ml-auto w-full"
                onSubmit={handleSubmit}
              >
                <h2
                  className="text-center text-2xl font-semibold"
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <div className="logo">Ren Basera</div>
                </h2>
                <div className="space-y-4" style={{ marginTop: "20px" }}>
                  <div>
                    <input
                      name="OTP"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="bg-gray-100 w-full h-[55px] text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                      placeholder="Enter OTP"
                      style={{ marginTop: "20px", padding: "5px" }}
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>
                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none h-10"
                  >
                    Verify Otp
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

export default Verification;
