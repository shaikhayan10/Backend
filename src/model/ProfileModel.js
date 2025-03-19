const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    Name : {
        type : String
    },
    Middlename : {
        type : String
    },
    Lastname : {
        type : String
    },
    Email : {
        type : String
    },
    Mobile : {
        type : Number
    },
    Address : {
        type : String
    },
    Birthdate : {
        type : Date
    },
    Age : {
        type : Number
    },
    Faname : {
        type : String
    },
    Faoccupation : {
        type : String
    },
    Faqualification : {
        type : String
    },
    Moname : {
        type : String
    },
    Mooccupation : {
        type : String
    },
    Moqualification : {
        type : String
    },
    Marksx : {
        type : Number
    },
    Marksperx : {
        type : Number
    },
    Marksxii : {
        type : Number
    },
    Marksperxii : {
        type : Number
    },
    city : {
        type : String
    },
    state : {
        type : String
    },
    country : {
        type : String
    }
})

module.exports = mongoose.model('Profile',profileSchema)