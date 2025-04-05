// backend/controllers/quizController.js

const Quiz = require("../model/QuizModel");
const UserResponse = require("../model/UserResponseModel");
const SchoolSchema = require("../model/SchoolModel");

// Submit Quiz & Calculate Score
const submitQuiz = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    if (!userId || !answers || typeof answers !== 'object') {
      return res.status(400).json({ error: "Invalid data format. 'userId' and 'answers' are required." });
    }

    const questions = await Quiz.find();
    const totalQuestions = questions.length;

    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let questionsAttempted = 0;

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

    const newUserResponse = new UserResponse({
      userId,
      answers,
      score,
      correctAnswers,
      wrongAnswers,
      totalQuestions,
      questionsAttempted,
    });

    await newUserResponse.save();

    res.status(200).json({ score, correctAnswers, wrongAnswers, totalQuestions, questionsAttempted, userId });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Seed Questions into Database
const createQuiz = async (req, res) => {
  const questions = req.body.questions;

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
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
};

const getUserScore = async (req, res) => {
  try {
    const { userId } = req.params;

    const responses = await UserResponse.find({ userId }).sort({ createdAt: -1 });

    if (!responses || responses.length === 0) {
      return res.status(404).json({ message: "No score found for this user" });
    }

    const latestResponse = responses[0];
    res.status(200).json({
      userId: latestResponse.userId,
      answers: latestResponse.answers,
      score: latestResponse.score,
      correctAnswers: latestResponse.correctAnswers,
      wrongAnswers: latestResponse.wrongAnswers,
      totalQuestions: latestResponse.totalQuestions,
      questionsAttempted: latestResponse.questionsAttempted,
      createdAt: latestResponse.createdAt,
      updatedAt: latestResponse.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user score", error });
  }
};

const getFilteredSchools = async (req, res) => {
  try {
    const { userId } = req.params;

    const responses = await UserResponse.find({ userId }).sort({ createdAt: -1 });

    if (!responses || responses.length === 0) {
      return res.status(404).json({ message: "No score found for this user" });
    }

    const latestResponse = responses[0];
    const userScore = latestResponse.score;

    const filteredSchools = await SchoolSchema.find({ ranking: { $lte: userScore } });

    res.status(200).json({
      message: "Filtered Schools Fetched Successfully",
      data: filteredSchools,
    });
  } catch (error) {
    res.status(500).json({ message: "Error In Fetching Filtered Schools", error });
  }
};

module.exports = {
  createQuiz,
  submitQuiz,
  getQuizQuestions,
  getUserScore,
  getFilteredSchools,
};