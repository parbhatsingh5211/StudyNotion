import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI'

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();

    const dispatch = useDispatch();
    const { course, editCourse } = useSelector( (state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect( () => {
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if(editCourse){
            setValue("CourseTitle", course.courseName)
            setValue("CourseShortDesc", course.courseDescription)
            setValue("CoursePrice", course.price)
            setValue("CourseTags", course.tag)
            setValue("CourseBenefits", course.whatYouWillLearn)
            setValue("CourseCategory", course.category)
            setValue("CourseRequirements", course.instructions)
            setValue("CourseImage", course.thumbnail)
        }
        getCategories();
    })

    const onSubmit = async (data) => {

    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
    >

    </form>
  )
}

export default CourseInformationForm