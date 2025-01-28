const express = require("express");
const RequestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

RequestRouter.get("/sendConnectionRequest",userAuth, async (req,res) => {
    res.send("send connecion request");
  })

module.exports = RequestRouter;