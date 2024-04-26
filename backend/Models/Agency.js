const mongoose=require('mongoose')
const Agencyschema=new mongoose.Schema({
    
    agencyname:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true

    },
    state:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    country:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    },
    type:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    verified: {
        type: Boolean,
        default: false
      }

   
   
  
   
  
   

})

let Agency=mongoose.model('Agency',Agencyschema)

module.exports=Agency