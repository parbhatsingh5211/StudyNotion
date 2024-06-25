import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getAllCourses } from '../../../services/operations/courseDetailsAPI';
// import CourseTable from './InstructorCourses/CourseTable';
import Course_Card from '../Catalog/Course_Card';

export default function Courses() {

    // const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async() => {
            const result = await getAllCourses();
            if(result) {
                setCourses(result);
            }
        }
        fetchCourses();
    }, [])
    console.log("Courses: ",courses)

  return (
    <div>
        <div className="mb-14 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-richblack-5">All Courses</h1>
        </div>
        <div className='grid grid-cols-1 gap-10 xl:gap-6 lg:grid-cols-3 px-14 xl:p-0'>
            {courses && courses.map((course, index) => (
                <Course_Card course={course}  key={index} Height={"400px"}/>
            ))}
        </div>     
    </div>
  )
}