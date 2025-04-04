const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userResponseSchema = new Schema({
  userId: {  // Added userId field
    type: String,
    required: true,
  },
  answers: {
    type: Object,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  wrongAnswers: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  questionsAttempted: {
    type: Number,
    required: true,
  },
}, { timestamps: true }); // Adding timestamps to track when the response was created

module.exports = mongoose.model('UserResponse', userResponseSchema);
