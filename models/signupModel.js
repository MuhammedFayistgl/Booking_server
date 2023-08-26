import mongoose from "mongoose";

const userSingSchema = mongoose.Schema({
  UserName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Number: {
    type: String,
  },
  password: {
    type: String,
  },
  otp: {
    type: String,
  }
});

const userSingaDB = mongoose.model("UserSignData", userSingSchema);
export default userSingaDB;
