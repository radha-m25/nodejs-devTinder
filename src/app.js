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
