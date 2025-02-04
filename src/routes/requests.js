const express = require("express");
const RequestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

RequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const { status, toUserId } = req.params;
      const fromUserId = req.user._id;

      const allowedStatus = ["interested","ignored"];
      if(!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
      }

      const toUser = await User.findOne({ _id: toUserId});

      if(!toUser) {
        return res.status(404).json({ message: "User not found, Invalid user" });
      }

      const isExistConnection = await ConnectionRequest.findOne({
        $or: [
          {fromUserId, toUserId},
          {fromUserId: toUserId, toUserId: fromUserId}
        ]
      });

      if(isExistConnection) {
        return res.status(400).json({message: "Connection already exists"});
      }

      const userRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await userRequest.save();
      res.json({
        message: req.user.firstName + " " + "send " + status + " " + "request to " + " " + toUser.firstName ,
        data,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

RequestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;
    
    const allowedStatus = ["accepted","rejected"];

    if(!allowedStatus.includes(status)) {
      throw new Error("Invalid status");
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested"
    }).populate("fromUserId", "firstName lastName");
  // }).populate("fromUserId", [firstName,lastName]);

    console.log("connection request: " + connectionRequest);

    connectionRequest.status = status;

    // const data = await connectionRequest.save();

    res.json({
      message: "Request reviewed",
      // data
    });

  } catch(err) {
    res.status(500).json({message: err.message});
  }
})

module.exports = RequestRouter;