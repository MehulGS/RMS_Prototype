const express = require("express");
const { send_reservation, get_reservations, delete_reservation, edit_reservation } = require("../controller/reservation.js");

const router = express.Router();

router.post("/send", send_reservation);
router.get("/guestList", get_reservations);
router.put("/cancel/:reservationId", delete_reservation);
router.put("/arrived/:reservationId", edit_reservation);

module.exports = router;
