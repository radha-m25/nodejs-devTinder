const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.AuthToken;
  console.log("token: " + token);
  if (!token) {
    throw new Error("token is Invalid");
  }

  const decodedToken = jwt.verify(token, "DevTinder@2501");
  const { userId } = decodedToken;
  console.log("_id: " + userId);

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // attach the user with req to get in API [eg. /profile]
  req.user = user;
  next();
  } catch (err) {
    return res.status(400).send("ERROR: " + err.message);
  }
};


module.exports = {
  userAuth,
};
