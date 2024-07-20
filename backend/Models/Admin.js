const mongoose=require('mongoose')
const adminschema=new mongoose.Schema({
    
    fullname:{
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
  
    type:{
        type:String,
        required:true
    },
    
   
})

let Admin=mongoose.model('Admin',adminschema)
module.exports=Admin