const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    
    name:{
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
    }
   

})

let User=mongoose.model('User',userschema)

module.exports=User