const asyncHandler = require("express-async-handler");
const UserData = require("../models/userData");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const Token = require("../models/tokenModel");
// const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail");

// Generate Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.jwt_secret, { expiresIn: "1d" });
// };

// Register User
const registerUser = async (req, res) => {
  const { name,userId, password } = req.body;

try {
  // const newUser = new User({ ...req.body, verified: true });
  // await newUser.save();
  const newUser= await UserData.create({
    name,
    userId,
    password,
    verified:true
  });
  res.status(201).json({Msg:"new User added Successfully!"});
} catch (error) {
  res.status(400).json({Msg:error});
  console.log(error);
}
};

// Login User
 const loginUser = async (req, res) => {
  try {
    //get details from user
    const { userId, password } = req.body;
    const user = await UserData.findOne({ userId, password, verified: true });
    if (user) {
      res.status(200).send(user);
    } else {
      res.json({
        message: "Login Fail",
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
  };

// // Logout User
// const logout = asyncHandler(async (req, res) => {
//   res.cookie("token", "", {
//     path: "/",
//     httpOnly: true,
//     expires: new Date(0),
//     sameSite: "none",
//     secure: true,
//   });
//   return res.status(200).json({ message: "Successfully Logged Out" });
// });

// const protect = asyncHandler(async (req, res, next) => {
//   try {
//     //checking if requested page has a token
//     //const token = req.cookies.token;
//     if (!token) {
//       res.status(401).json({Msg : "Not Authorized"})
//     }

//     // Verify Token
//     const verified = jwt.verify(token, process.env.jwt_secret);
//     // Get user id from token and exclude the password
//     const user = await User.findById(verified.id).select("-password");

//     if (!user) {
//       res.status(401).json({Msg : "User not found"})
//     }
//     //user = user we got from the db
//     req.user = user;
//     //run the next piece of code
//     next();
//   } catch (error) {
//     res.status(401).json({Msg : "Login to continue"})
//   }
// });
// // Get User Data
// const getUser = asyncHandler(async (req, res) => {
//  // res.send("get users")
//   //find the user by the requested id
//   const user = User.findById(req.user._id);

//   if (user) {
//     const { _id, name, email, photo } = user;
//     res.status(200).json({
//       _id,
//       name,
//       email,
//       photo
//     });
//   } else {
//     res.status(400).json({Msg:"User not found"});
//   }
// });

// // Get Login Status
// const loginStatus = asyncHandler(async (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json(false);
//   }
//   // Verify Token
//   const verified = jwt.verify(token, process.env.JWT_SECRET);
//   if (verified) {
//     return res.json(true);
//   }
//   return res.json(false);
// });

// // Update User
// const updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     const { name, email, photo, phone, bio } = user;
//     user.email = email;
//     user.name = req.body.name || name;
//     user.phone = req.body.phone || phone;
//     user.bio = req.body.bio || bio;
//     user.photo = req.body.photo || photo;

//     const updatedUser = await user.save();
//     res.status(200).json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       photo: updatedUser.photo,
//       phone: updatedUser.phone,
//       bio: updatedUser.bio,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// const changePassword = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   const { oldPassword, password } = req.body;

//   if (!user) {
//     res.status(400);
//     throw new Error("User not found, please signup");
//   }
//   //Validate
//   if (!oldPassword || !password) {
//     res.status(400);
//     throw new Error("Please add old and new password");
//   }

//   // check if old password matches password in DB
//   const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

//   // Save new password
//   if (user && passwordIsCorrect) {
//     user.password = password;
//     await user.save();
//     res.status(200).send("Password change successful");
//   } else {
//     res.status(400);
//     throw new Error("Old password is incorrect");
//   }
// });

// const forgotPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     res.status(404);
//     throw new Error("User does not exist");
//   }

//   // Delete token if it exists in DB
//   let token = await Token.findOne({ userId: user._id });
//   if (token) {
//     await token.deleteOne();
//   }

//   // Create Reste Token
//   let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
//   console.log(resetToken);

//   // Hash token before saving to DB
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // Save Token to DB
//   await new Token({
//     userId: user._id,
//     token: hashedToken,
//     createdAt: Date.now(),
//     expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
//   }).save();

//   // Construct Reset Url
//   const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

//   // Reset Email
//   const message = `
//       <h2>Hello ${user.name}</h2>
//       <p>Please use the url below to reset your password</p>  
//       <p>This reset link is valid for only 30minutes.</p>

//       <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

//       <p>Regards...</p>
//       <p>Pinvent Team</p>
//     `;
//   const subject = "Password Reset Request";
//   const send_to = user.email;
//   const sent_from = process.env.EMAIL_USER;

//   try {
//     await sendEmail(subject, message, send_to, sent_from);
//     res.status(200).json({ success: true, message: "Reset Email Sent" });
//   } catch (error) {
//     res.status(500);
//     throw new Error("Email not sent, please try again");
//   }
// });

// // Reset Password
// const resetPassword = asyncHandler(async (req, res) => {
//   const { password } = req.body;
//   const { resetToken } = req.params;

//   // Hash token, then compare to Token in DB
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // fIND tOKEN in DB
//   const userToken = await Token.findOne({
//     token: hashedToken,
//     expiresAt: { $gt: Date.now() },
//   });

//   if (!userToken) {
//     res.status(404);
//     throw new Error("Invalid or Expired Token");
//   }

//   // Find user
//   const user = await User.findOne({ _id: userToken.userId });
//   user.password = password;
//   await user.save();
//   res.status(200).json({
//     message: "Password Reset Successful, Please Login",
//   });
// });

module.exports = {
  registerUser,
  loginUser,
  
  // loginStatus,
  // updateUser,
  // changePassword,
  // forgotPassword,
  // resetPassword,
};
