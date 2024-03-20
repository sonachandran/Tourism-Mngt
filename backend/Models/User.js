const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    username:{
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
    address:{
        type:String,
        required:true
    }
   

})

let User=mongoose.model('User',userschema)

module.exports=User