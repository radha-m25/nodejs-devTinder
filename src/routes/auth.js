const express = require('express');
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignupData } = require('../utils/validation');

authRouter.post("/signup", async (req, res) => {
  // validate data
  const { firstName, lastName, email, address, password , photoUrl,skills } = req.body;

  // encrypt password
  const passwordHash = await bcrypt.hash(password, 10);

  // create userDetails instance
  const userDetails = {
    firstName,
    lastName,
    email,
    password: passwordHash,
    address,
    photoUrl,
    skills
  };

  try {
    if(validateSignupData(req)) {
      res.send("Data is valid");
    }
    if (userDetails?.skills?.length > 10) {
      return res.status(400).send("max legnth exceed");
    }
    const user = new User(userDetails);
    user.save();
    res.send("User Created");
  } catch (e) {
    res.send("Error Occured while creating user" + e.message);
  }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).send("Invalid email or password");
      }
  
      const isMatchPassword = await user.validatePassword(password);
  
      if (!isMatchPassword) {
        return res.status(400).send("Invalid email or password");
      } else {
  
        // JWT token creation
        const token = await user.getJWT();
  
        // send the generated token to the cookies
        res.cookie("AuthToken", token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
  
        res.send("Login Success");
      }
    } catch (e) {
      return res.send("ERROR: " + " " + e.message);
    }
  });

authRouter.post("/logout", async (req,res) => {
  res.cookie("AuthToken", null , {expires: new Date(Date.now())});
  res.send("logged out ssuccessfully!!!");
})

module.exports = authRouter;