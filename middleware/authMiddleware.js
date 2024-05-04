const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//this is an auth middlewwre to protect certain routes 

const protect = asyncHandler(async (req, res, next) => {
  try {
    //checking if requested page has a token
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({Msg : "Not Authorized"})
    }

    // Verify Token
    const verified = jwt.verify(token,process.env.jwt_secret);
    // Get user id from token and exclude the password
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401).json({Msg : "User not found"})
    }
    //user = user we got from the db
    req.user = user;
    //run the next piece of code
    next();
  } catch (error) {
    res.status(401).json({Msg : "Unable to continue"})
  }
});

module.exports = protect;
