const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collegeSchema = new Schema ({
    Cname : {
        type : String
    },
    Location : {
        type : String
    },
    Course : {
        type : String
    },
    Fees : {
        type : String
    },
    Perx : {
        type : Number
    },
    Perxii : {
        type : Number
    },
    Ratings : {
        type : String
    } 
})

module.exports = mongoose.model('College',collegeSchema)