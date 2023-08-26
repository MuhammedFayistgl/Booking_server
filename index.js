import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connutionDB from "./server/server.js";
import userRouter from "./router/router.js";
import adminRouter from "./router/admin.js";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";


const app = express();


app.use(function (req, res, next) {

  var allowedDomains = ['http://localhost:5173', 'http://localhost:5174'];
  var origin = req.headers.origin;
  if (allowedDomains.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);

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

app.listen(process.env.PORT || 8000, () => {
  console.log(`nodes listening on port${process.env.PORT} `);
  console.log();
});

