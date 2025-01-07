const express = require("express");
const { adminAuth, userAuth } = require("./adminAuth");



const app = express();

// whatever route is start with "/admin" first it will check the admin middleware
app.use("/admin",adminAuth);

app.get("/admin/data",(req,res) => {
    res.send("Welcome Admin");
})

// only for this route userAuth will check
app.get("/user/data",userAuth,(req,res) => {
    res.send("Welcome User");
})

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
