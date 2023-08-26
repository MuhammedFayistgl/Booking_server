import mongoose from "mongoose";

 const apiDataModel = mongoose.Schema({
  amount: {
    type: "number",
    required: true,
  },
  category: {
    type: "string",
    required: true,
  },
  discription: {
    type: "string",
    required: true,
  },
  name: {
    type: "string",
    required: true,
  },
  place: {
    type: "string",
    required: true,
  },
  rating: {
    type: "number",
    required: true,
  },
  profilImg:{
    type: "string",
    required: false,
  }
  ,extraImages:{
    type: "array",
    required: false,
    
  }
 
});
 const apis = mongoose.model('CRUDapis',apiDataModel)
 export default apis
 