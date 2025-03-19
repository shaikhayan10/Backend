const router = require('express').Router()
const CollegeController = require("../controller/CollegeController")

router.post("/createCollege",CollegeController.createCollege)
router.get("/getCollege",CollegeController.getCollege)
module.exports = router
