const express = require("express");
const { AddItem, EditItem, DeleteItem, GetMenuItems } = require("../controller/menuController");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/add-item",upload.single("image"), AddItem);
router.put("/edit-item/:id", EditItem);
router.delete("/delete-item/:id", DeleteItem);
router.get("/menu-items", GetMenuItems);

module.exports = router;