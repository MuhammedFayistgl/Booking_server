import express from "express";

import {
  registerUser,
  getUser,
  getOneUser,
  updateUser,
  deleteUser,
  signup,
  otpSend,
  userdetealsVerification,
  crateNewOTP,
} from "../controller/userController.js";


import { bockingHandler, getmyBooking ,getuser ,cancelOrder} from "../controller/Bockinguser.js";
import {  registergenrteOtpHandler ,otpverifyingHandler,loginHandler } from "../controller/userHelper.js";
import { authentcationMiddlwer } from "../middlewere/authmiddlwer.js";
import { uplodprofileimg } from "../controller/profile.js";
import multer from "multer";
import fs from 'fs'
import { fileExistimg } from "../middlewere/imguplodMiddlwer.js";

const router = express.Router();
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profile");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `image-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage: multerStorage });
// router.post("/", registerUser);
// router.get("/getUser", protect, getUser);
// router.get("/oneUser", getOneUser);
// router.post("/userupdate", updateUser);
// router.delete("/delete/:id", deleteUser);
// router.post("/sendOtp", otpSend);
// router.post("/otpVerification", signup);
// router.post("/userdetealsVerification", userdetealsVerification);
// router.post("/signup", crateNewOTP);
router.post("/bocking",authentcationMiddlwer,  bockingHandler);
router.post("/getotp", registergenrteOtpHandler);
router.post("/otpverifying",  otpverifyingHandler);
router.post ('/userlogin',loginHandler)
router.post ('/Loginverify', authentcationMiddlwer);
router.get ('/getmyBooking', authentcationMiddlwer,getmyBooking);
router.post ('/getuser', authentcationMiddlwer,getuser);
router.post ('/cancelOrder',cancelOrder);
router.post ('/uplodprofileimg',authentcationMiddlwer,fileExistimg,upload.single("file"),uplodprofileimg,);
export default router;
