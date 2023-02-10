const mongoose = require("mongoose")
const schema = mongoose.Schema

const db = new schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },
     
    price: {
        type: String,
        required: true,
        default: 0
    },

    discount: {
        type: Number
    },

    category: {
        type: String,
        required: true
    },

    comment: {
        type: String
    },
    
    like: {
        type: Number,
        default:0
    },

    photo: {
        type: String
    },

    region: {
        type: String,
        required: true
    },

    district: {
        type: String,
        required : true
    },

    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("product", db)