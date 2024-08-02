const express = require("express")
const router = express.Router();
const { auth, isInstructor } = require("../middlewares/auth");
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    getEnrolledCourses,
    updateDisplayPicture,
    instructorDashboard,
} = require('../controllers/Profile');

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",auth, deleteAccount);
// Update User Profile
router.put("/updateProfile", auth, updateProfile);
// Get User Details
router.get("/getUserDetails", auth, getAllUserDetails);
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
// Update Display Picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
module.exports = router;