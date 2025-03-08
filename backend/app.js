const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { errorMiddleware } = require("./middlewares/error.js");
const reservationRouter = require("./routes/reservationRoute.js");
const userRouter = require("./routes/userRoute.js")
const menuRouter=require("./routes/menuRoutes.js")
const addtypeRouter=require("./routes/addtypeRoutes.js")
const dbConnection = require("./database/dbConnection.js");

const app = express();
dotenv.config({ path: "./config.env" });

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/menu",menuRouter)
app.use("/api/v1/type",addtypeRouter)

app.get("/", (req, res, next)=>{return res.status(200).json({
  success: true,
  message: "HELLO WORLD AGAIN"
})})

dbConnection();

app.use(errorMiddleware);

module.exports=app
