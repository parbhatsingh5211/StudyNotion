import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {

    const {token} = useSelector( (state) => state.auth);
    const [enrolledCourses, setEnrolledCourese] = useState(null);

    const getEnrolledCourses = async() => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourese(response);
        } catch (error) {
            console.log("Unable to fetch Enrolled Courses.")
        }
    }
    console.log(enrolledCourses);

    const TRUNCATE_LENGTH = 10 ;

    useEffect( () => {
        getEnrolledCourses();
    }, []);

  return (
    <div className='text-richblack-5'>
        <div className='text-3xl'>Enrolled Courses</div>
        {!enrolledCourses 
        ? (
            <div className='spinner'></div>
        ) : (
            !enrolledCourses.length 
            ? (
                <p>
                    You have not enroll any course yet 
                </p>
            ) : (
                <div className='rounded-lg bg-richblack-600 mt-10 border-2 border-richblack-800'>
                    <div className='grid grid-cols-3 px-4 py-2 '>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>
                    {/* Cards */}
                    {enrolledCourses.map( (course, index) => (
                        <div key={index}
                            className={`grid grid-cols-3 bg-richblack-900 py-2 px-4
                            ${index < enrolledCourses.length-1 ? "border-b-2 border-richblack-800" : ""}`}
                        >
                            <div className='flex gap-1 lg:gap-4 flex-col lg:flex-row'>
                                <img src={course.thumbnail} alt="CourseImage"  className='rounded-md lg:w-[100px] w-[50%]'/>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-sm'>{course.courseName}</p>
                                    <p className="text-xs text-richblack-300">
                                        {course.courseDescription.split(" ").length >
                                        TRUNCATE_LENGTH
                                            ? course.courseDescription
                                                .split(" ")
                                                .slice(0, TRUNCATE_LENGTH)
                                                .join(" ") + "..."
                                            : course.courseDescription}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center text-sm'>
                                {course?.totalDuration}
                            </div>
                            <div className='flex flex-col justify-center gap-2'>
                                <p className='text-sm'>Progress: {course.progresPercentage || 0} %</p>
                                <ProgressBar 
                                    completed={course.progresPercentage || 0}
                                    height='8px'
                                    isLabelVisible={false}
                                    width='60%'
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )
        )}
    </div>
  )
}

export default EnrolledCourses