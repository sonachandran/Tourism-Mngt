const mongoose=require('mongoose')
const User = require('./User')
const packageschema=new mongoose.Schema({
    
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true

    },
    destination:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true

    },

    
    userid:{
        type:mongoose.Types.ObjectId,
        ref:User
    } 
  
})
let Package=mongoose.model('package',packageschema)
module.exports=Package
