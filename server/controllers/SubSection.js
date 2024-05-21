const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
require('dotenv').config();


// Create a new sub-section for a given section
exports.createSubSection = async (req, res) => {
    try{
        // Extract necessary information from the request body
        const { sectionId, title, timeDuration, description } = req.body;
		const video = req.files.videoFile;

        // Check if all necessary fields are provided
        if(!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(40).json({
                success: false,
                message: 'All Fields are Required',
                
            })
        }

        // Upload the video file to Cloudinary
        const uploadDetails = await uploadImageToCloudinary(
            video, 
            process.env.FOLDER_NAME
        );

        // Create a new sub-section with the necessary information
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })


        // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: subSectionDetails } },
            { new: true }
        ).populate('subSection').exec();

        // Return the updated section in the response
        return res.status(200).json({
            success: true,
            data: updatedSection,
        });
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error("Error creating new sub-section:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};


exports.updateSubSection = async (req, res) => {
    try{
        // fetch data
        const {subSectionName, subSectionId} = req.body; 
        
        // data validation
        if(!subSectionName || !subSectionId){
            return res.status(400).json({
                success: false,
                message: 'Missing Properties.'
            })
        }

        // update data 
        const subSection = SubSection.findByIdAndUpdate(subSectionId, {subSectionName}, {new: true});

        // return res
        return res.status(200).json({
            success: true,
            message: 'SubSection updated succcesssfully.',
            subSection
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Unable to update subSection, please try again.',
            error: error.message
        });
    }
};


exports.deleteSubSection = async (req, res) => {
    try{
        // fetch subsection-ID
        const {subSectionId} = req.params;

        // delete by findByIdAndDelete function
        await SubSection.findByIdAndDelete(subSectionId);

        // TODO [Testing] : do we need to delete the entry from the Section schema ??
        // return res
        return res.status(200).json({
            success: true,
            message: 'SubSection deleted succcesssfully.',
            
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Unable to delete subSection, please try again.',
            error: error.message
        });
    }
};