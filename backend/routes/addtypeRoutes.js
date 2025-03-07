const express = require("express");
const { AddType } = require("../controller/addtypeController");
const router = express.Router();

router.post("/add-type", AddType);

module.exports=router;