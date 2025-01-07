const express = require("express");


const app = express();

app.get("/admin",(req,res) => {
    res.send("Welcome Admin");
})

app.get("/dashboard", (req, res,next) => {
  console.log("dashboard-1");
  // res.send("Welcome to dashboard dashboard-1");
  next();
},
(req,res,next) => {
    console.log("dashboard-2");
    // res.send("Welcome to dashboard dashboard-2");
    next();
},
(req,res) => {
    console.log("dashboard-3");
    res.send("Welcome to dashboard dashboard-3");
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
