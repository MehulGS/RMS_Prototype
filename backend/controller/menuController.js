const ErrorHandler = require("../middlewares/error");
const Menu = require("../models/menu");
const Type = require("../models/type");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Add Menu Item (Only Manager)
const AddItem = async (req, res, next) => {
    const { type, foodname, price } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized! No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "manager") {
            return res.status(403).json({ success: false, message: "Access Denied! Only managers can add menu items." });
        }

        if (!type || !foodname || !price) {
            return next(new ErrorHandler("Please fill all the fields!", 400));
        }

        // Find the type by name
        const existingType = await Type.findOne({ type });
        if (!existingType) {
            return next(new ErrorHandler("Invalid type provided!", 400));
        }

        const newMenu = await Menu.create({ type: existingType._id, foodname, price });

        res.status(201).json({
            success: true,
            message: "Menu Item Added Successfully",
            data: newMenu
        });

    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token!", 401));
    }
};

// Edit Menu Item (Only Manager)
const EditItem = async (req, res, next) => {
    const { id } = req.params;
    const { type, foodname, price } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized! No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "manager") {
            return res.status(403).json({ success: false, message: "Access Denied! Only managers can edit menu items." });
        }

        // Find the type by name
        const existingType = await Type.findOne({ type });
        if (!existingType) {
            return next(new ErrorHandler("Invalid type provided!", 400));
        }

        const updatedMenu = await Menu.findByIdAndUpdate(
            id,
            { type: existingType._id, foodname, price },
            { new: true }
        );

        if (!updatedMenu) {
            return next(new ErrorHandler("Menu item not found!", 404));
        }

        res.status(200).json({
            success: true,
            message: "Menu Item Updated Successfully",
            data: updatedMenu
        });

    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token!", 401));
    }
};


// Delete Menu Item (Only Manager)
const DeleteItem = async (req, res, next) => {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized! No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "manager") {
            return res.status(403).json({ success: false, message: "Access Denied! Only managers can delete menu items." });
        }

        const deletedMenu = await Menu.findByIdAndDelete(id);
        if (!deletedMenu) {
            return next(new ErrorHandler("Menu item not found!", 404));
        }

        res.status(200).json({
            success: true,
            message: "Menu Item Deleted Successfully",
            data: deletedMenu
        });

    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token!", 401));
    }
};

const GetMenuItems = async (req, res, next) => {
    try {
        const menuItems = await Menu.find().populate("type", "type"); // Populate type name

        res.status(200).json({
            success: true,
            data: menuItems
        });
    } catch (error) {
        return next(new ErrorHandler("Error fetching menu items!", 500));
    }
};


module.exports = {
    AddItem,
    EditItem,
    DeleteItem,
    GetMenuItems
};
