const express = require("express");
// const { adminAuth, userAuth } = require("./middlewares/adminAuth");
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express();

// // whatever route is start with "/admin" first it will check the admin middleware
// app.use("/admin",adminAuth);

// app.get("/admin/data",(req,res) => {
//     res.send("Welcome Admin");
// })

// // only for this route userAuth will check
// app.get("/user/data",userAuth,(req,res) => {
//     res.send("Welcome User");
// })

app.post("/signup",(req,res) => {
    const userObj = {
        firstName: "Radha",
        lastName: "Muthu",
        address: "Chennai",
    }

    const user = new User(userObj);
    user.save();
    res.send("User Created");
})

connectDB().then(() => {
    console.log("db connected successfully..");
    app.listen(7777, () => {
        console.log("Server is running on port 7777");
      });
}).catch((err) => {
    console.error("Db not connected!!!");
})
