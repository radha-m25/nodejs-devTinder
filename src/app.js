const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // validate data
  const { firstName,lastName,email,password } = req.body;

  // encrypt password
  const passwordHash = await bcrypt.hash(password, 10);

    console.log(passwordHash);

  // create userDetails instance
    const userDetails = ({
      firstName,
      lastName,
      email,
      password: passwordHash
    })
    console.log("user>>>",userDetails);
  
    try {
      if(userDetails?.skills?.length > 10) {
        return res.status(400).send("max legnth exceed");
      }
    const user = new User(userDetails);
      user.save();
      res.send("User Created");
    } catch(e) {
      res.send("Error Occured while creating user" + e.message);
    }
  });

  app.get("/feed",async (req,res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("users not found");
    }
  })

  app.get("/user",async (req,res) => {
    const userFirstName = req.body.firstName;
    try {
        const user = await User.findOne({firstName: userFirstName});
        res.send(user);
    } catch (err) {
        res.status(400).send("users not found");
    }
  })

  app.delete("/deleteUser",async (req,res) => {
    const userFirstName = req.body.firstName;
    try {
        const user = await User.deleteOne({firstName: userFirstName});
        res.send(user);
    } catch (err) {
        res.status(400).send("users not deleted");
    }
  })

  app.patch("/updateUser",async (req,res) => {
    const userId = req.body._id;
    const userData = req.body;
    
    try {
        const allowed_update = ["_id","firstName","lastName","address","photoUrl","about","skills"];
        const isAllowedData = Object.keys(userData).every((k) => allowed_update.includes(k));

        if(!isAllowedData) {
          res.status(400).send("update not allowed");
        }
        await User.findByIdAndUpdate({_id: userId},userData,{
          runValidators: true,
        });
        res.send("user updated Successfully!!");
    }catch(err) {
        res.status(400).send("users not updated" + " " + err.message);
    }
})


connectDB()
  .then(() => {
    console.log("db connected successfully..");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Db not connected!!!");
  });
