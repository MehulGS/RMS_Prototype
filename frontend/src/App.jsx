import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Success from "./Pages/Success/Success";
import "./App.css";
import Admin from "./Pages/Admin/Admin";
import Registration from "./Pages/Auth/Registration/Registration";
import Login from "./Pages/Auth/Login/Login";
import ResetotpMail from "./Pages/Auth/Reset_Email/ResetotpMail";
import Verification from "./Pages/Auth/Otp_Verify/Verification";
import Changepassword from "./Pages/Auth/Changepassword/Changepassword";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* UserSide */}
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<NotFound />} />

          {/* Authentication */}
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetotpMail />} />
          <Route path="/otp-verification" element={<Verification />} />
          <Route path="/update-password" element={<Changepassword />} />

          {/* ManagerSide */}
          <Route path="/dashboard" element={<Admin />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
