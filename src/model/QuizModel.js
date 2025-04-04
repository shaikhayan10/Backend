const mongoose = require("mongoose");
const Schema = mongoose.Schema

const quizSchema = new Schema({
  category: {
    type:String
  },
  number: {
    type:Number
  },
  text: {
    type:String
  },
  options: {
    type: [String]
  },
  correctAnswer: {
    type: String
  },
})

module.exports = mongoose.model('Quiz',quizSchema)

