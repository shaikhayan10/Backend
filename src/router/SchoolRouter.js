const router = require('express').Router()
const SchoolController = require("../controller/SchoolController")

router.post("/createSchool",SchoolController.createSchool)
router.get("/getSchool",SchoolController.getSchool)
module.exports = router
