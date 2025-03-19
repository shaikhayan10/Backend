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
const UserResponseSchema = new Schema({
  answers: { type: Object, required: true },
  score: Number,
});
module.exports = mongoose.model('Userresponse',UserResponseSchema)
// const Quiz = mongoose.model("Quiz", QuizSchema);
// const UserResponse = mongoose.model("UserResponse", UserResponseSchema);


