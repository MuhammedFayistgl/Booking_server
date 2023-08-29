import mongoose from "mongoose";
import express from "express";
const app = express();

const connution = async () => {
  mongoose.set('strictQuery', true)
  mongoose.connect(
    process.env.MONGODB_DERVER_IP,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err) => {
      if (err) {
        console.log("error in connection");
        process.exit(1)
      } else {
        console.log("mongodb is connected");
      }
    });
  //create a server object:
  app.listen(process.env.PORT || 8000, () => {
    console.log(`nodes listening on port${process.env.PORT} `);
  });
  //the server object listens on port 8080


  // try {
  //   mongoose.set('strictQuery', true)
  //   mongoose.connect(
  //     process.env.MONGODB_DERVER_IP
  //     // "mongodb+srv://booking:booking@cluster0.qdxkopx.mongodb.net/?retryWrites=true&w=majority"
  //     // "mongodb+srv://booking:booking@cluster0.qdxkopx.mongodb.net/?retryWrites=true&w=majority"
  //     // "mongodb://127.0.0.1:27017"
  //     , {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true
  //     });

  //   console.log(`Mongodb connection established`);
  // } catch (error) {
  //   console.log("connuction Erorr", error);
  //   process.exit(1);
  // }
};


export default connution;
