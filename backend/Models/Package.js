
const mongoose = require('mongoose');
const Agency = require('./Agency');

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
  days: {
    type: String,
    required: true
  },

  rating:{
    type:String,
    required:true

  },
  
  userid: {
    type: mongoose.Types.ObjectId,
    ref:Agency
  },
  spots:[{
    name: {
      type: String,
      required: true
    },
    spotimage: {
      type: String
    }
  }], 
  hotels:[{
    name: {
      type: String,
      required: true
    },
    hotelimage: {
      type: String
    }
  }]

});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;



