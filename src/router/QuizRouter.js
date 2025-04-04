const router = require('express').Router();
const quizController = require("../controller/QuizController");


// Create a new quiz
router.post("/createQuiz", quizController.createQuiz);

// Submit quiz and save user score
router.post("/submitQuiz", quizController.submitQuiz);

// Get quiz questions
router.get("/getQuizQuestions", quizController.getQuizQuestions);

// Fetch user's score by userId (This is the route to be updated)
router.get("/getUserScore/:userId", quizController.getUserScore);

module.exports = router;
