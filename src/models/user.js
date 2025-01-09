const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    }
})

// mongoose.model(User,"userSchema");

module.exports = mongoose.model('User', userSchema);