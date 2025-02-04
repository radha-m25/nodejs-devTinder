const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema({
    fromUserId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
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



connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("You can't send a connection request to yourself");
    }
    next();
})


const ConnectionRequestModel = new mongoose.model('ConnectionRequest', connectionRequestSchema);


module.exports = ConnectionRequestModel;