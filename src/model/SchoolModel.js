const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schoolSchema = new Schema ({
    Sname : {
        type : String
    },
    Location : {
        type : String
    },
    Course : {
        type : String
    },
    Education : {
        type : String
    },
    Boards : {
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

module.exports = mongoose.model('School',schoolSchema)