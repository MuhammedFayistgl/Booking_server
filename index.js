import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connutionDB from "./server/server.js";
import userRouter from "./router/router.js";
import adminRouter from "./router/admin.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors())
app.use(function (req, res, next) {

  // var allowedDomains = [' http://localhost:5173/Booking_frontend/'
  //   , 'http://localhost:5174' , 'http://localhost:5173'];
  // var origin = req.headers.origin;
  // if (allowedDomains.indexOf(origin) > -1) {
  //   res.setHeader('Access-Control-Allow-Origin', origin);
  // }

  // var allowedDomains = ['http://localhost:5173', 'http://localhost:5174'];
  // var origin = req.headers.origin;
  // if (allowedDomains.indexOf(origin) > -1) {
  //   res.setHeader('Access-Control-Allow-Origin', origin);
  // }

  next();
})
// app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.json());
dotenv.config()
app.use(express.static("public"));
app.use(express.static("public/profile"));

connutionDB();



app.get("/", (req, res) => {
  res.send("welcome to node js ");
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);



