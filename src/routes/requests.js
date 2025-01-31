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
      const user = req.user;
      const fromUserId = user._id;

      const allowedStatus = ["interested","ignored"];
      if(!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
      }

      const toUser = await User.findOne({toUserId});

      if(!toUser) {
        return res.status(404).json({ message: "User not found, Invalid user" });
      }

      const isExistConnection = await ConnectionRequest.findOne({
        $or: [
          {fromUserId: fromUserId, toUserId: toUserId},
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
        message: "Connection Request Sent Successfully",
        data,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

module.exports = RequestRouter;