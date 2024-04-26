const mongoose=require('mongoose')
const reviewschema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    
    image:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true

    }
   
})

let Review=mongoose.model('Review',reviewschema)

module.exports=Review