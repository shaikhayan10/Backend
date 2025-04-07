const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
app.use(express.json())

app.use(cors({ origin: "http://localhost:5174" }));


const UserRoutes = require("./src/router/UserRouter")
app.use("/user",UserRoutes)

const RoleRoutes = require("./src/router/RoleRouter")
app.use("/role",RoleRoutes)

const ProfileRoutes = require("./src/router/ProfileRouter")
app.use("/profile",ProfileRoutes)

const SchoolRoutes = require("./src/router/SchoolRouter")
app.use("/school",SchoolRoutes)

const CollegeRoutes = require("./src/router/CollegeRouter")
app.use("/college",CollegeRoutes)

const QuizRouter = require("./src/router/QuizRouter");
app.use("/quiz", QuizRouter);


const db = mongoose.connect("mongodb://127.0.0.1:27017/Career_Counselling")
db.then((data) => {
    console.log("DB Connected")
}).catch((err) => {
    console.log(err)
})

const PORT = 3001
app.listen(PORT,() => {
    console.log("Server is connected to port 3001")
})