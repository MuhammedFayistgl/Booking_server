import mongoose from "mongoose";


const connution = async () => {
  try {
    mongoose.set('strictQuery', true)
    mongoose.connect(
      // "mongodb+srv://booking:booking@cluster0.qdxkopx.mongodb.net/?retryWrites=true&w=majority"
      "mongodb+srv://booking:booking@cluster0.qdxkopx.mongodb.net/?retryWrites=true&w=majority"
      // "mongodb://127.0.0.1:27017"
      , {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    console.log(`Mongodb connection established`);
  } catch (error) {
    console.log("connuction Erorr", error);
    process.exit(1);
  }
};


export default connution;
