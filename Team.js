// this file used to create a student model
const mongoose = require('mongoose')
const playerSchema=mongoose.Schema({
    name : String,
    position : Number,
    role : String
})
module.exports=mongoose.model('Team',playerSchema)