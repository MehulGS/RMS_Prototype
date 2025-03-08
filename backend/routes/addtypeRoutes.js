const express = require("express");
const { AddType, GetType } = require("../controller/addtypeController");
const router = express.Router();

router.post("/add-type", AddType);
router.get("/get-type",GetType)

module.exports=router;