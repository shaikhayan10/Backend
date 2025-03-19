const Quiz = require("../model/QuizModel");

// // Submit Quiz & Calculate Score
const submitQuiz = async (req, res) => {
  try {
    const userAnswers = req.body.answers;
    const questions = await Quiz.find();

    let score = 0;
    questions.forEach((question) => {
      if (userAnswers[question.number] === question.correctAnswer) {
        score += 1;
      }
    });

    const userResponse = new UserResponse({ answers: userAnswers, score });
    await userResponse.save();

    res.json({ score });
  } catch (error) {
    res.status(500).json({ message: "Error submitting quiz", error });
  }
};

// Seed Questions into Database
const createQuiz = async (req, res) => {
  const questions = [
    { category:"Quantitative Aptitude", 
      number: 1,
      text: "If a train travels at 60 km/hr, how long will it take to cover a distance of 300 km?",
      options: ["3 hours", "4 hours", "5 hours", "6 hours"],
      correctAnswer: "5 hours" },
    { category: "Logical Reasoning",
      number: 2, 
      text: "Complete the sequence: 2, 6, 12, 20,...?", 
      options: ["30", "42", "36", "48"], 
      correctAnswer: "30" },
    {
        category: "Quantitative Aptitude",
        number: 3,
        text: "What is the value of x in equation : 2x + 5 = 15?",
        options: ["05", "10", "03", "07.5"],
        correctAnswer: "10",
      },
      {
        category: "Logical Reasoning",
        number: 4,
        text: "If all Flinks are Blinks, and some Blinks are Clinks, then:",
        options: ["All Flinks are Clinks", "Some Flinks might be Clinks", "No Flinks are Clinks", "All Clinks are Flinks"],
        correctAnswer: "Some Flinks might be Clinks",
      },
      {
        category: "General Awareness",
        number: 5,
        text: "Which of these is not a programming language?",
        options: ["Java", "Python", "Cascada", "Ruby"],
        correctAnswer: "Cascada",
      },
      {
        category: "General Awareness",
        number: 6,
        text: "Which field is known as the 'Queen of Science'?",
        options: ["Physics", "Mathematics", "Biology", "Chemistry"],
        correctAnswer: "Physics",
      },
      {
        category: "Verbal Ability",
        number: 7,
        text: "Choose the word that is mostly nearly opposite in meaning to 'Benevolent':",
        options: ["Malevolent", "Charitable", "Generous", "Bengin"],
        correctAnswer: "Malevolent",
      },
      {
        category: "Verbal Ability",
        number: 8,
        text: "Complete the analogy: Book is to Reader as Song is to:",
        options: ["Writer", "Musician", "Listener", "Composer"],
        correctAnswer: "Listener",
      },
      {
        category: "Enterpreneurship",
        number: 9,
        text: "Which of the following best defines a 'Minimum Viable Product(MVP)'?",
        options: ["The cheapest product that can be sold profitably", "A version with just enough feature to attract early customers", "The smallest possible team needed to create a product", "A product that requires minimal investment"],
        correctAnswer: "A version with just enough feature to attract early customers",
      },
      {
        category: "Enterpreneurship",
        number: 10,
        text: "What is the primary purpose of a business model canvas?",
        options: ["To create a detailed financial projection", "To visualize and structure a business concept", "To design a company logo and branding", "To outline a marking strategy"],
        correctAnswer: "To visualize and structure a business concept",
      },
  ];

  try {
    await Quiz.insertMany(questions);
    res.json({ message: "Questions added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding questions", error });
  }
};

module.exports = {
    createQuiz,
    submitQuiz,
}
