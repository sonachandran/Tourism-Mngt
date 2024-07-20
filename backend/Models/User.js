const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
  
    type:{
        type:String,
        required:true
    },
    
    city:{
        type:String,
        required:true
    },
    verified: {
        type: Boolean,
        default: false
      }

})

let User=mongoose.model('User',userschema)

module.exports=User