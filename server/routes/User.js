const express = require('express');
const router = express.Router();

const { 
    login,
    signUp,
    sendOTP,
    changePassword,

} = require('../controllers/Auth');

const { 
    resetPasswordToken,
    resetPassword,

} = require('../controllers/ResetPassword')

const { auth } = require('../middlewares/auth')

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************
// Routes for Login, Signup, and Authentication
router.post("/login", login);
router.post("/signup", signUp);
// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP);
// Route for Changing the password
router.post("/changePassword", auth, changePassword);


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************
// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);
// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

module.exports = router;