const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid'+ " " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error('Invalid URL'+ " " + value);
        }
    }
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "other"].includes(value)) {
                throw new Error('Invalid gender');
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 18) {
                throw new Error('Age must be 18 or above');
            }
        }
    },
    about: {
        type: String,
        default: "default msg",
    },
    skills: {
        type: [String],
    }
}, {timestamps: true});

// mongoose.model(User,"userSchema");

module.exports = mongoose.model('User', userSchema);