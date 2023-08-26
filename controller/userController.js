import userSingaDB from "../models/signupModel.js";
import usermodel from "../models/userModals.js";
import { genarateToken } from "../utils/util.js";
import nodemailer from "nodemailer";

import Twilio from "twilio";
import otpGenerator from "otp-generator";

export const registerUser = async (req, res) => {    
  try {
    const { username, password } = req.body;

    let user = new usermodel({
      username: username,
      password: password,
    });
    user = await user.save();
    let tocken = genarateToken(user._id);

    user = { ...user._doc, tocken };
    console.log(tocken);
    res.status(200).json({
      errorcode: 0,
      status: true,
      message: "User Created  successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
  }
};
//! get all users

export const getUser = async (req, res) => {
  try {
    let allUser = await usermodel.find({});
    res.status(200).json({
      errorcode: 0,
      status: true,
      msg: "All users found",
      data: allUser,
    });
  } catch (error) {
    console.error(error);
  }
};
//* Get One User

export const getOneUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    let Oneuser = await usermodel.findOne({ username: username });
    if (!Oneuser) {
      return res.status(200).json({
        statuscode: 1,
        status: false,
        message: "User not found",
        data: null,
      });
    }
    if (Oneuser.password !== password) {
      return res.status(200).json({
        errorcode: 2,
        status: false,
        msg: "password incuruct",
        data: null,
      });
    }
    return res
      .status(200)
      .json({ errorcode: 0, status: true, msg: "users found", data: Oneuser });
  } catch (error) {
    console.error(error);
  }
};
/** updat user */
export const updateUser = async (req, res) => {
  try {
    let { _id, username, password } = req.body;
    console.log(req.body);
    let user = await usermodel.findById(_id);
    if (!user) {
      return res.status(200).json({
        errorcode: 2,
        status: false,
        msg: "user not foundwwwwwwwww",
        data: null,
      });
    }
    user.username = username ? username : user.username;
    user = await user.save();
  } catch (error) {
    console.error(error);
  }
};

/** delete user */

export const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    console.log(" req.params", req.params);
    const user = await usermodel.findByIdAndDelete(id);
    if (!user) {
      return res.status(200).json({
        errorcode: 2,
        status: false,
        msg: "user not found !",
        data: null,
      });
    }
    return res.status(200).json({
      errorcode: 2,
      status: false,
      msg: "user delete sucssusfully",
      data: null,
    });
  } catch (error) {
    console.error(error);
  }
};

//**  ==== USER CREATE ==== */

export const signup = async (req, res) => {
  res.json({ data: "556545" });
  // console.log("user data received", req.body);
  // const { UserName, Email, Number, password } = req.body;

  // try {

  //   console.log("exists", userExist);
  //   if (userExist) {
  //     console.log("user exist");
  //     res
  //       .status(200)
  //       .json({ errorcode: 0, status: false, message: "user already exists" });
  //   }
  //   if (!userExist) {
  //     console.log("registration successful");

  //     let newuser = await new userSingaDB({
  //       UserName,
  //       Email,
  //       Number,
  //       password,
  //     });
  //     newuser = await newuser.save();
  //     res
  //       .status(200)
  //       .json({ errorcode: 0, status: true, message: "user already exists" });
  //   }


  //   if (!userExist) {
  //     res.status(200).json({ statuscode: 0, msg: "User already exists " });
  //     console.log("User already exists");
  //   }
  //   console.log('mooo');
  //   if(userExist){

  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.status(200).json({ statuscode: 1, msg: error.message, mg: "kkk" });
  // }
};

export const otpVerification = async (req, res, next) => {
  try {
    const userExist = await userSingaDB.exists({ Number: Number });
    if (userExist) {
      res.status(200).json({ statuscode: 0, msg: "user alredy exist" });
    }

    const otp = Math.floor(Math.random() * 100000);
    const { Email } = req.body;
    console.log("user email", Email);
    // send otp mail
    console.log("send otp", req.body);
    // let transporter = nodemailer.createTransport({

    //   service: "gmail",
    //   auth: {
    //     user: "muhammedfayisthangal@gmail.com",
    //     pass: "qanpljdjpijpatkc",
    //   },
    // });
    // transporter.sendMail(
    //   {
    //     from: "2muhammedfayisthangal@gmail.com", // sender address
    //     to: `${Email}`, // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: ` your One-time OTP  ${otp} `, // plain text body

    //   },
    //   (error, info) => {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log(info.response);
    //     }
    //   })

    res.status(200).json({
      statuscode: 0,
      status: true,
      message: "Otp send successful",
      data: otp,
    });
  } catch (error) {
    res.status(200).json({
      statuscode: 1,
      status: false,
      message: "Otp Sending Failed  !!",
      data: otp,
    });
  }

  //   const userExist = await userSingaDB.exists({ Number: Number });
  //   if(user){ res.status(200).json({statuscode:0,msg:'user alredy exist'}); }

  //   if(!userExist){
  //     let newuser = await new userSingaDB({
  //       UserName,
  //       Email,
  //       Number,
  //       password,
  //     });
  //     newuser = await newuser.save();
  //     res
  //       .status(200)
  //       .json({ statuscode: 0, msg: "send otp yur ", data: newuser });
  //   }

  //   const {Email}  = req.body;
  // console.log( req.body);
  //   const otp =  Math.floor(Math.random() * 100000)
  //     try {
  //       //**  OTP send user email */
  //       console.log('send otp' , req.body);
  //       let transporter = nodemailer.createTransport({

  //         service: "gmail",
  //         auth: {
  //           user: "muhammedfayisthangal@gmail.com",
  //           pass: "qanpljdjpijpatkc",
  //         },
  //       });
  //       transporter.sendMail(
  //         {
  //           from: "2muhammedfayisthangal@gmail.com", // sender address
  //           to: `${Email}`, // list of receivers
  //           subject: "Hello ✔", // Subject line
  //           text: ` your One-time OTP  ${otp} `, // plain text body

  //         },
  //         (error, info) => {
  //           if (error) {
  //             console.log(error);
  //           } else {
  //             console.log(info.response);
  //           }
  //         }
  //       );

  //     next()

  //     } catch (error) {
  //       console.log(error);
  //     }
};

export const otpSend = async (req, res) => {
  const otp = Math.floor(Math.random() * 100000);
  const { UserName, Email, Number, password } = req.body;
  if (!Email) {
    res.status(404).json({ statuscode: 0, message: "user name is required" }),
      console.log("Email is required");
  }
  try {
    const userExist = await userSingaDB.exists({ Email });
    if (userExist) {
      res.status(200).json({ statuscode: 0, msg: "user alredy exist" }),
        console.log("user alredy exist");
    }
    if (!userExist) {
      //send mail to user
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "muhammedfayisthangal@gmail.com",
          pass: "qanpljdjpijpatkc",
        },
      });
      transporter.sendMail(
        {
          from: "2muhammedfayisthangal@gmail.com", // sender address
          to: `${Email}`, // list of receivers
          subject: "Hello ✔", // Subject line
          text: ` your One-time OTP  ${otp} `, // plain text body
        },

        (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(info.response);
          }
        }
      );
      //save user email and otp
      let newuserRegistratin = new userSingaDB({
        Email,
        otp: otp,
      });
      newuserRegistratin = await newuserRegistratin.save();
      res.status(200).json({ statuscode: "0", msg: "otp send success fully" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const userdetealsVerification = async (req, res) => {
  const { UserName, password, Email, Number, Otp } = req.body.state;
  if (!UserName || !password || !Email || !Number || !Otp) {
    res.status(404).json({ statuscode: 0, message: "all feald are required" });
  }

  try {
    console.log("Otp", Otp);
    let user = await userSingaDB.updateMany(
      { otp: Otp },
      {
        UserName: UserName,
        Email: Email,
        Number: Number,
        password: password,
      },
      (err, result) => {
        if (err) console.log(err);
        else console.log(result);
      }
    );
    if (!user) {
      res.status(404).json({ statuscode: 0, message: "otp not maching" });
    }

    console.log(user, "uuuuuuuuuuuuuser", req.body);

    console.log("successfully registration");
  } catch (error) {
    console.log(error);
  }
};

//** let Start user authentication proccss */
export const crateNewOTP = async (phoneNum) => {
  // Generate a 6 digit numeric OTP
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const ttl = 5 * 60 * 1000;
  const expires = Date.now() + ttl;

   console.log('GeneratedOTP',ttl);
  console.log("GeneratedOTP", expires);
  console.log("GeneratedOTP", otp);
};

