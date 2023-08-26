import express from "express";
import multer from "multer";
import {
  getdatas,
  uplodeDatabace,
  deletOnedata,
  imageupload,
  deleteimage,
  editimage,
  extraimageupload,
  userBookingGetadminHandler,
  loginadmin,
  } from "../controller/adminadditems.js";
import { signupadmin } from "../controller/adminRegister.js";
import { loginAdmin } from "../controller/adminLogin.js";

const router = express.Router();
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `image-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage: multerStorage });

router.post("/uplodehotelDeteals", uplodeDatabace);
router.get("/getallDeteals", getdatas);
router.post("/deleteoneDeteals", deletOnedata);
router.post("/imageupload", upload.single("file"), imageupload);
router.post("/deleteimage", deleteimage);
router.post("/editimage", editimage);
router.post("/extraimageupload", upload.array("filse", 15), extraimageupload);
router.get("/userBookingGetadmin",  userBookingGetadminHandler);
router.post("/loginadmin",  loginAdmin);
router.post("/signupadmin",  signupadmin);

export default router;
