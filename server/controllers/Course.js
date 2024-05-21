const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config();

//createCourse handler function
exports.createCourse = async (req,res) => {
    try{
        // Get all required fields from request body
        let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
        if (!status || status === undefined) {
			status = "Draft";
		}

        // check for Instructor
        const userId = req.user.id;
        // Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});
        
        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            });
        }


        // check if the given Category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: 'Category Details Not Found.'
            });
        }

        // Upload the Thumbnail to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail, 
            process.env.FOLDER_NAME
        );

        // Create a new course with the given details
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            Category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions, 
        })

        // Add the new course to the User Schema of the Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id
                }
            },
            {new: true}
        )

        // Add the new course to the Categories
        await Category.findByIdAndUpdate(
            {_id: categoryDetails._id},
            {
                $push: {
                    courses: newCourse._id 
                }
            },
            {new: true}
        )

        // Return the new course and a success message
        return res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        })

    }catch(error){
        // Handle any errors that occur during the creation of the course
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'failed to create course.',
            error: error.message
        })
    }
}


// getAllCourses handler fucntion
exports.getAllCourses = async (req, res) => {
    try{
        const allCourses = await Course.find({},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
		)
			.populate("instructor")
			.exec();                    
        return res.status(200).json({
            success: true,
            data: allCourses,
        });                             
 
    }catch(error){
        console.log(error);
        return res.status(404).json({
            success: false,
            message: `Can't Fetch Course Data`,
            errror: error.message
        })
    }
}

exports.getCourseDetails = async (req, res) => {
    try{
        const { courseId } = req.body;
        // console.log(courseId);
        const courseDetails = await Course.find(
            {_id:courseId} )
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                }
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
            .exec();
        // console.log("CourseDETAILS: ",courseDetails);
        if(!courseDetails) {
            return res.status(500).json({
                success: false,
                message: `Couldn't find the course with ${courseId}`,
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Course Details Fetched Successfully',
            courseDetails
        })

    } catch(error) {
        console.log("Error in getCourseDetails: ", error);
        return res.status(500).json({ success: false, message: error.message });
    }    
};