const ErrorHandler = require("../middlewares/error");
const Type = require("../models/type");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const AddType = async (req, res, next) => {
    const { type } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized! No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "manager") {
            return res.status(403).json({ success: false, message: "Access Denied! Only managers can add menu types." });
        }

        if (!type) {
            return next(new ErrorHandler("Type field is required!", 400));
        }

        // Check if type already exists
        const existingType = await Type.findOne({ type });
        if (existingType) {
            return next(new ErrorHandler("Type already exists!", 400));
        }

        const newType = await Type.create({ type });

        res.status(201).json({
            success: true,
            message: "Menu Type Added Successfully",
            data: newType
        });

    } catch (error) {
        console.log(error)
        return next(new ErrorHandler("Invalid or expired token!", 401));
    }
};

module.exports = { AddType };
