const CollegeSchema = require("../model/CollegeModel")

const createCollege = async(req,res) => {
    const College = req.body
    const savedCollege = await CollegeSchema.create(College)

    res.status(200).json({
        message : "College Created Successfully",
        data : savedCollege
    })
}

const getCollege = async(req,res) => {
    const getCollege = await CollegeSchema.find()
    if(getCollege){
        res.status(200).json({
            message : "College Fetched Successfully",
            data : getCollege
        })
    }
    else{
        res.status(400).json({
            message : "Error In Fetching College"
        })
    }
}

module.exports = {
    createCollege,
    getCollege
}