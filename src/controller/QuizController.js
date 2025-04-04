const Quiz = require("../model/QuizModel");
const UserResponse = require("../model/UserResponseModel");

// Submit Quiz & Calculate Score
const submitQuiz = async (req, res) => {
  try {
    const { userId, answers } = req.body; // Extract userId and answers from the request body

    if (!userId || !answers || typeof answers !== 'object') {
      return res.status(400).json({ error: "Invalid data format. 'userId' and 'answers' are required." });
    }

    const questions = await Quiz.find();
    const totalQuestions = questions.length;

    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let questionsAttempted = 0;

    // Calculate score and insights
    questions.forEach((question) => {
      const userAnswer = answers[question.number];

      if (userAnswer) {
        questionsAttempted++;
        
        if (userAnswer === question.correctAnswer) {
          score++;
          correctAnswers++;
        } else {
          wrongAnswers++;
        }
      }
    });

    console.log("Score:", score);

    // Save the user's response and insights to the database
    const newUserResponse = new UserResponse({
      userId, // Save userId
      answers,
      score,
      correctAnswers,
      wrongAnswers,
      totalQuestions,
      questionsAttempted,
    });

    await newUserResponse.save();

    // Send the score and insights back to the frontend
    res.status(200).json({ score, correctAnswers, wrongAnswers, totalQuestions, questionsAttempted });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


 

// Seed Questions into Database
const createQuiz = async (req, res) => {
  const questions = req.body.questions;  // Take questions from JSON input

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: "No questions provided or invalid format." });
  }

  try {
    await Quiz.insertMany(questions);
    res.json({ message: "Questions added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding questions", error });
  }
};

const getQuizQuestions = async (req, res) => {
  try {
    const questions = await Quiz.find();
    res.json(questions);  // Send all questions as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
};

const getUserScore = async (req, res) => {
  try {
    const { userId } = req.params;

    const response = await UserResponse.findOne({ userId });

    if (!response) {
      return res.status(404).json({ message: "No score found for this user" });
    }

    // Return all the fields from the user response
    res.status(200).json({
      userId: response.userId,
      answers: response.answers,
      score: response.score,
      correctAnswers: response.correctAnswers,
      wrongAnswers: response.wrongAnswers,
      totalQuestions: response.totalQuestions,
      questionsAttempted: response.questionsAttempted,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user score", error });
  }
};

module.exports = {
  createQuiz,
  submitQuiz,
  getQuizQuestions,
  getUserScore
};
