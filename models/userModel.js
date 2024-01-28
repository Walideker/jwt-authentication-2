const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:String,
    password:String
})

const userModel = mongoose.model('User',userSchema,'students')

module.exports = userModel