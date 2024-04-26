// const mongoose=require('mongoose')
// const User = require('./User')
// const packageschema=new mongoose.Schema({
    
//     image:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true

//     },
//     destination:{
//         type:String,
//         required:true
//     },
//     price:{
//         type:String,
//         required:true

//     },
    
//     userid:{
//         type:mongoose.Types.ObjectId,
//         ref:User
//     } 
  
// })
// let Package=mongoose.model('package',packageschema)
// module.exports=Package


const mongoose = require('mongoose');
const User = require('./User');

const spotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  spotimage: {
    type: String
  }
});

const packageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  userid: {
    type: mongoose.Types.ObjectId,
    ref: User
  },
  spots: [spotSchema] // Array of spots with their names and images
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;



