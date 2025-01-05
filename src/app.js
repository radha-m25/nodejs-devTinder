const express = require("express");

const app = express();

//http://localhost:7777/abcd
//http://localhost:7777/abcccccccccd
app.get("/abc+d",(req,res) => {
    res.send("abcd, abcccc..d. start with ab and ends with d, with c in between count as you needed");
})

// http://localhost:7777/abcbcbcd
// anything you can write b/w ab and d. but start with ab and end with d
// "ab(cd)?f" - here bc is optional
app.get("/abc*d",(req,res) => {
    res.send("abcd, abcbcbc..d. start with ab and ends with d, with bc in between count as you needed");
})


app.get("/ab?c",(req,res) => {
    res.send("u can add anything after abc");
})

//.*fly$/ - start with anything but end with fly
app.get(/.*fly$/,(req,res) => {
    res.send("start with anything but end with fly");
})

app.get("/dashboard/:username/:password", (req,res) => {
    console.log(req.params);
    res.send("Welcome to the dashboard");
})

// http://localhost:7777/signup?username=user1
app.get("/signup",(req,res) => {
    console.log(req.query);
    res.send("Sign up page");
})

app.post("/home", (req,res) => {
    res.send("Welcome to the home page, post call done");
})

app.delete("/product",(req,res) => {
    res.send("Product deleted");
})

app.put("/login",(req,res) => {
    res.send("login updated");
})

app.listen(7777, () => {
    console.log("Server is running on port 7777");
});