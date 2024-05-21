const Section = require('../models/Section');
const Course = require('../models/Course');

// CREATE a new section
exports.createSection = async (req, res) => {
    try{
        // Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

        // Validate the input
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: 'Missing required properties'
            });
        }

        // Create a new section with the given name
		const newSection = await Section.create({ sectionName });

        // Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        // Return the updated course object in the response
        return res.status(200).json({
            success: true,
            message: 'Section created sucessfully.',
            updatedCourse,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Unable to create Section, please try again.',
            error: error.message
        });
    }
};



// UPDATE a section
exports.updateSection = async (req, res) => {
    try{
        const { sectionName, sectionId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);
        return res.status(200).json({
            success: true,
            message: section,
        });
    } catch (error) {
        console.error("Error updating section:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


// DELETE a section
exports.deleteSection = async (req, res) => {
    try{
        const { sectionId } = req.params;
        await Section.findByIdAndDelete(sectionId);

        // remove section for course
        // await Course.updateMany(
        //     { _id: sectionId },
        //     { $pull: { _id: sectionId }},
        //     { new: true } 
        // )
        // await Course.findById({_id: courseId})

        return res.status(200).json({
            success: true,
            message: 'Section deleted'
        });
    } catch (error) {
        console.error("Error deleting section:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
};