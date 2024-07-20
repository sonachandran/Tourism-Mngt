const mongoose = require('mongoose');

const Day1schema = new mongoose.Schema({
 
  activities: {
    type: [String],
    required: true
  },
  foodOptions: {
    type: [String],
    required: true
  },
  accommodation: {
    type: String
  }
});

let Day1 = mongoose.model('Day1', Day1schema);

module.exports = Day1;
