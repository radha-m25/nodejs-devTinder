const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const userDetails = req.body;
    console.log("user>>>",userDetails);
    // const userObj = {
    //   firstName: "Roobi",
    //   lastName: "Muthu",
    //   address: "Ariyalur",
    // };
  
    try {
      //creating the new instance of a user model
      //const user = new User(userObj);
    const user = new User(userDetails);
      user.save();
      res.send("User Created");
    } catch {
      res.send("Error Occured while creating user");
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
        await User.findByIdAndUpdate({_id: userId},userData);
        res.send("user updated Successfully!!");
    }catch(err) {
        res.status(400).send("users not updated");
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
