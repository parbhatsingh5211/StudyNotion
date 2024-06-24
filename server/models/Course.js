const mongoose = require('mongoose');
const User = require('../models/User')

// Define the Courses schema
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        trim: true,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    whatYouWillLearn: {
        type: String,
        trim: true,
    },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview"
    }],
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    tag: {
		type: [String],
		required: true,
	},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        // required: true
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }],
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    language: {
        type: String
    }
}, { timestamps: true });

// Export the Courses model
module.exports = mongoose.model("Course", courseSchema);