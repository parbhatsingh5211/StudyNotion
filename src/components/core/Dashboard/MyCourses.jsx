import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import { BiPlus } from 'react-icons/bi'
import CourseTable from './InstructorCourses/CourseTable';

export default function MyCourses() {

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async() => {
            const result = await fetchInstructorCourses(token);
            if(result) {
                setCourses(result);
            }
        }
        fetchCourses();
    }, [])

  return (
    <div>
        <div className="mb-14 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-richblack-5">MyCourses</h1>
            <IconBtn 
                text={"Add Course"}
                onclick={() => navigate("/dashboard/add-course")}
            >
                <BiPlus />
            </IconBtn>
        </div>
        <div className="text-lg text-richblack-200 px-5 py-3 rounded-lg inline font-semibold">
            Total Courses: <span className='w-[15px] h-[15px] bg-richblack-800 rounded-full px-3 py-2 ml-3 font-medium text-richblack-100'>{courses.length}</span>
        </div>
        {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}