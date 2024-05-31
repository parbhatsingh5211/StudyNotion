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

    useEffect( () => {
        getEnrolledCourses();
    }, []);

  return (
    <div>
        <div>Enrolled Courses</div>
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
                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>
                    {/* Cards */}
                    {enrolledCourses.map( (course, index) => (
                        <div key={index}>
                            <div>
                                <img src={course.thumbnail} alt="CourseImage"/>
                                <div>
                                    <p>{course.courseName}</p>
                                    <p>{course.courseDescription}</p>
                                </div>
                            </div>
                            <div>
                                {course?.totalDuration}
                            </div>
                            <div>
                                <p>Progress: {course.progresPercentage || 0}</p>
                                <ProgressBar 
                                    completed={course.progresPercentage || 0}
                                    height='8px'
                                    isLabelVisible={false}
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