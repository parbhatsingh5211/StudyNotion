const Profile = require('../models/Profile');
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")
const User = require('../models/User');

const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration")

exports.updateProfile = async (req, res) => {
    try{
        const {dateOfBirth="", about="", gender="", contactNumber="", profession="", firstName, lastName} = req.body;
        const id = req.user.id;

        // Find the profile by id
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

        // Update the profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.gender = gender;
        profile.profession = profession;
        profile.contactNumber = contactNumber;

        // Save the updated profile
		await profile.save();
        // console.log(profile)

        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        await userDetails.save();

        const updatedUserDetails = await User.findById(id)
            .populate("additionalDetails")
        return res.status(200).json({
            success: true,
            message: 'Profile updated Successfully',
            profile,
            updatedUserDetails,
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Unable to update Profile, please try again.',
            error: error.message
        });
    }
};


// deleteAccount Handler 
//  how can we schedule this deletion operation
exports.deleteAccount = async (req, res) => {
    try{
        const id =req.user.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        // Delete Assosiated Profile with the User
        await Profile.findByIdAndDelete({_id: user.additionalDetails});

        // unenroll user from all enrolled course
        // await Course.updateMany(
        //     {studentsEnrolled: id},
        //     {$pull: {studentsEnrolled: id}},
        //     {new: true} 
        // )

        // Now Delete User
        await User.findByIdAndDelete({_id: id});

        return res.status(200).json({
            success: true,
            message: 'Account deleted Successfully.'
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Unable to delete Account, please try again.',
            error: error.message
        });
    }
};


exports.getAllUserDetails = async (req, res) => {
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id)
            .populate('additionalDetails')
            .exec();
        console.log(userDetails);

        return res.status(200).json({
            success: true,
            message: 'User Data fetched successfully',
            data: userDetails
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
    try{
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// getEnrolledCourses
exports.getEnrolledCourses = async (req, res) => {
    try{
        const userId = req.user.id
        const userDetails = await User.findOne({
          _id: userId,
        })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec();
            
        // userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
              totalDurationInSeconds += userDetails.courses[i].courseContent[
                j
              ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
              userDetails.courses[i].totalDuration = convertSecondsToDuration(
                totalDurationInSeconds
              )
              SubsectionLength +=
                userDetails.courses[i].courseContent[j].subSection.length
            }

            let courseProgressCount = await CourseProgress.findOne({
              courseID: userDetails.courses[i]._id,
              userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
              userDetails.courses[i].progressPercentage = 100
            } else {
              // To make it up to 2 decimal point
              const multiplier = Math.pow(10, 2)
              userDetails.courses[i].progressPercentage =
                Math.round(
                  (courseProgressCount / SubsectionLength) * 100 * multiplier
                ) / multiplier
            }
        }

        if(!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
    }
}