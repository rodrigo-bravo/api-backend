const mongoose = require('mongoose')
require('mongoose-type-email');
const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    fullName :{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    books: [{
        title: {
            type: String,
            required: true
        },
        img: {
            data: Buffer,
            contentType: String
        },
        author: {
            type: String,
            required: true
        },
        publisher: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        dateCreated: {
            type: Date,
            default: new Date()
        },
        favorite: {
            type: Boolean,
            default: false
        },
        rating: {
            type: Number,
            min: 0, 
            max: 10,
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
        },
        comments: {
            type: String,
            required: true,
            default: "N/A"
        }
    }]
})
const userModel = mongoose.model('user', userSchema, 'users')

// Exporting mongoose schema model
module.exports = userModel
