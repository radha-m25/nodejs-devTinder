const express = require("express");

const app = express();

app.use("/home",(req,res) => {
    res.send("From home");
})

app.use("/productOne",(req,res) => {
    res.send("From productOne");
})

app.use("/productTwo",(req,res) => {
    res.send("From productTwo");
})

app.listen(7777, () => {
    console.log("Server is running on port 7777");
});