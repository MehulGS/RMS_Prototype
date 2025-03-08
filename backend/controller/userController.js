const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const otpStore = new Map();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const register = async (req, res) => {
    try {
        let { name, email, password, phone, role } = req.body;


        phone = phone.replace(/\D/g, "");

    
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: "Phone number is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword, phone, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id,name:user.name,role:user.role,email:user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });


        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = generateOTP();
        otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 }); 

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}. It is valid for 5 minutes.`,
        });

        res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const storedOtp = otpStore.get(email);

        if (!storedOtp || storedOtp.otp !== otp || storedOtp.expires < Date.now()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });

        otpStore.delete(email);

        res.status(200).json({ success: true, message: "OTP verified", resetToken });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const changePassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        if (!resetToken) {
            return res.status(400).json({ success: false, message: "Invalid request" });
        }

    
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        const email = decoded.email;

    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ email }, { password: hashedPassword });

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Invalid or expired token" });
    }
}

module.exports = { register, login, sendOtp, verifyOtp,changePassword };

