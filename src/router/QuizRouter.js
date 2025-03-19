const router = require('express').Router()
const  quizController= require("../controller/QuizController");

// const router = express.Router();

router.post("/createQuiz",quizController.createQuiz);
router.post("/submitQuiz",quizController.submitQuiz);

module.exports = router;

