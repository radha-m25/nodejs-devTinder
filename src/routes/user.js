const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

userRouter.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("users not found");
  }
});

userRouter.get("/user", async (req, res) => {
  const userFirstName = req.body.firstName;
  try {
    const user = await User.findOne({ firstName: userFirstName });
    res.send(user);
  } catch (err) {
    res.status(400).send("users not found");
  }
});

userRouter.delete("/deleteUser", async (req, res) => {
  const userFirstName = req.body.firstName;
  try {
    const user = await User.deleteOne({ firstName: userFirstName });
    res.send(user);
  } catch (err) {
    res.status(400).send("users not deleted");
  }
});

userRouter.patch("/updateUser", async (req, res) => {
  const userId = req.body._id;
  const userData = req.body;

  try {
    const allowed_update = [
      "_id",
      "firstName",
      "lastName",
      "address",
      "photoUrl",
      "about",
      "skills",
    ];
    const isAllowedData = Object.keys(userData).every((k) =>
      allowed_update.includes(k)
    );

    if (!isAllowedData) {
      res.status(400).send("update not allowed");
    }
    await User.findByIdAndUpdate({ _id: userId }, userData, {
      runValidators: true,
    });
    res.send("user updated Successfully!!");
  } catch (err) {
    res.status(400).send("users not updated" + " " + err.message);
  }
});

module.exports = userRouter;
