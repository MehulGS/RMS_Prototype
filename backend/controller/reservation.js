const ErrorHandler = require("../middlewares/error");
const Reservation = require("../models/Reservation");
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone, totalPeople, status } = req.body;

  if (!firstName || !lastName || !email || !date || !time || !phone || !totalPeople) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    await Reservation.create({ firstName, lastName, email, date, time, phone, totalPeople, status });

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your Table is Reserved! See You Soon",
      text: `Dear ${firstName} ${lastName},

Great news! Your reservation at RenBasera is confirmed, and we can't wait to serve you a delightful dining experience. Here are your booking details:

📅 Date: ${date}  
⏰ Time: ${time}  
👥 Guests: ${totalPeople}  

We recommend arriving 10 minutes early to ensure a smooth seating experience. Should you need any changes or assistance, feel free to reach out at 📞 +91 94394 93949   

Looking forward to hosting you for an unforgettable meal! 🍷🍽️✨  

Bon appétit!  
Ren Basera  
📞 +91 94394 93949   
`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    console.log(error)
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};

const get_reservations = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized. No token provided." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }

    if (decoded.role !== "manager") {
      return res.status(403).json({ success: false, message: "Access denied." });
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const totalReservations = await Reservation.countDocuments();
    const reservations = await Reservation.find().skip((page - 1) * limit).limit(limit);

    res.status(200).json({
      success: true,
      reservations,
      page,
      limit,
      totalReservations,
      totalPages: Math.ceil(totalReservations / limit),
    });
  } catch (error) {
    next(new ErrorHandler(error.message || "Failed to fetch reservations", 500));
  }
};


const delete_reservation = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "manager") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only managers can modify reservations.",
      });
    }

    const { reservationId } = req.params;
    if (!reservationId) {
      return res.status(400).json({
        success: false,
        message: "Reservation ID is required.",
      });
    }

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found.",
      });
    }

    // Instead of deleting, update status to 'Cancelled'
    reservation.status = "Cancelled";
    await reservation.save();

    res.status(200).json({
      success: true,
      message: "Reservation status updated to Cancelled.",
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to update reservation status", 500));
  }
};

const edit_reservation = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "manager") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only managers can modify reservations.",
      });
    }

    const { reservationId } = req.params;
    if (!reservationId) {
      return res.status(400).json({
        success: false,
        message: "Reservation ID is required.",
      });
    }

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found.",
      });
    }

    reservation.status = "Arrived";
    await reservation.save();

    res.status(200).json({
      success: true,
      message: "Reservation status updated to Arrived.",
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to update reservation status", 500));
  }
};

// ✅ Export as named exports
module.exports = { send_reservation, get_reservations, delete_reservation, edit_reservation };

