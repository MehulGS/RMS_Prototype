const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { errorMiddleware } = require("./middlewares/error.js");
const reservationRouter = require("./routes/reservationRoute.js");
const userRouter = require("./routes/userRoute.js")
const dbConnection = require("./database/dbConnection.js");

const app = express();
dotenv.config({ path: "./config.env" });

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow cookies and authentication headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/user", userRouter);
app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})

dbConnection();

app.use(errorMiddleware);

module.exports=app
