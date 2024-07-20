const mongoose=require('mongoose')
const User = require('./User')
const Bookingschema=new mongoose.Schema({
    
    destination:{
        type:String,
        required:true
    },
    howmany:{
        type:String,
        required:true

    },
    arrivals:{
        type:String,
        required:true
    },
    leaving:{
        type:String,
        required:true

    },
  
    // dob:{
    //     type:String,
    //     required:true
    // },
    
    userid:{
        type:mongoose.Types.ObjectId,
        ref:User
    } ,
    transportation:{
        type:String,
        required:true
    },
    accommodation:{
        type:String,
        required:true
    },

})

let Booking=mongoose.model('Booking',Bookingschema)

module.exports=Booking