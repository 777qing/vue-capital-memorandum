const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    type: {
        type: String,
    },
    describe: {
        type: String
    },
    income: {
        type: String,
        require: true
    },
    expend: {
        type: String,
        require: true
    },
    cash: {
        type: String,
        require: true
    },
    remark: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)