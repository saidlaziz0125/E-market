const mongoose = require("mongoose")
const schema = mongoose.Schema


const db = new schema ({
    username: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    login: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("User", db)