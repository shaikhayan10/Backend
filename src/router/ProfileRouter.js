const router = require('express').Router()
const profileController = require("../controller/ProfileController")

router.post("/createProfile",profileController.createProfile)
router.get("/getProfile",profileController.getProfile)
module.exports = router
