const express = require("express");
const { AddItem, EditItem, DeleteItem, GetMenuItems } = require("../controller/menuController");

const router = express.Router();

// Route to add a menu item (Only accessible by managers)
router.post("/add-item", AddItem);

// Route to edit a menu item (Only accessible by managers)
router.put("/edit-item/:id", EditItem);

// Route to delete a menu item (Only accessible by managers)
router.delete("/delete-item/:id", DeleteItem);

router.get("/menu-items", GetMenuItems);


module.exports = router;
