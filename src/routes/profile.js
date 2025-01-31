const express = require('express');
const ProfileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditData} = require("../utils/validation");
const bcrypt = require("bcrypt");

ProfileRouter.get("/profile/view",userAuth, async (req, res) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      return res.status(400).send("ERROR: " + err.message);
    }
  });

ProfileRouter.patch("/profile/edit",userAuth,async (req,res) => {
  try {
    if(!validateEditData(req)) {
      throw new Error("Invalid edit Request");
    }
    const loggedUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedUser[key] = req.body[key];
    })
    loggedUser.save();
    res.json({message: `${loggedUser.firstName} , profile updated successfully , ${loggedUser}`});

  }catch(err) {
    return res.status(400).send("ERROR: " + err.message);
  }
})

ProfileRouter.patch("/profile/password", userAuth, async (req,res) => {
  const user = req.user;
  const newPassword = req.body.password;
  user.password = await bcrypt.hash(newPassword, 10);
  user.save();
  res.cookie("AuthToken", null , {expires: new Date(Date.now())});
  res.send("Password updated successfully, Please login again");
})

module.exports = ProfileRouter;