const adminAuth = (req,res,next) => {
    const token = "xyz";
    const adminAuth = token === "xyz";
    if(!adminAuth){
        return res.send("Admin Auth Failed");
    }else{
        next();
    }
}

const userAuth = (req,res,next) => {
    const user = "xyz";
    const userAuth = user === "xyz";
    if(!userAuth){
        return res.send("User Auth Failed");
    }else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}
