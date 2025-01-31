const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema({
    fromUserId: {
        type: mongoose.Types.ObjectId
    },
    toUserId: {
        type: mongoose.Types.ObjectId
    },
    status: {
        type: String,
        enum: {
            values: ['ignored', 'interested' , 'accepted', 'rejected'],
            message: '{VALUE} is not a valid status'
        }
        }
}, { timestamps: true });


const ConnectionRequestModel = new mongoose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequestModel;