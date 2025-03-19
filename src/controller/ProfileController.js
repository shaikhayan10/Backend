const profileSchema = require("../model/ProfileModel")

const createProfile = async(req,res) => {
    const profile = req.body
    const savedProfile = await profileSchema.create(profile)

    res.status(200).json({
        message : "Profile Created Successfully",
        data : savedProfile
    })
}

const getProfile = async(req,res) => {
    const getProfile = await profileSchema.find()
    if(getProfile){
        res.status(200).json({
            message : "Profile Fetched Successfully",
            data : getProfile
        })
    }
    else{
        res.status(400).json({
            message : "Error In Fetching Profile"
        })
    }
}

module.exports = {
    createProfile,
    getProfile
}