const express = require("express");
const { register, login, sendOtp, verifyOtp, changePassword } = require("../controller/userController.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/change-password",changePassword)

module.exports = router;
