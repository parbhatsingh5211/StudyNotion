import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI'
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementField from './RequirementField';
import IconBtn from '../../../../common/IconBtn'
import { setCourse, setStep } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector( (state) => state.auth)
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
    },[])

    const isFormUpdated = () => {
        const currentVaules = getValues();
        if(currentVaules.courseTitle !== course.courseName ||
            currentVaules.CourseShortDesc !== course.courseDescription ||
            currentVaules.CoursePrice !== course.price ||
            // currentVaules.CourseTags.toString() !== course.tag.toString() ||
            currentVaules.CourseBenefits !== course.whatYouWillLearn ||
            currentVaules.CourseCategory._id !== course.category._id ||
            // currentVaules.CourseImage !== course.thumbnail ||
            currentVaules.CourseRequirements.toString() !== course.instructions.toString() 
        )
            return true;
        else
            return false; 
    }

    // handles next button click
    const onSubmit = async (data) => {
        if(editCourse) {
            if(isFormUpdated()) {
                const currentVaules = getValues();
                const formData = new FormData();
                formData.append("courseId", course._id);

                if(currentVaules.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                if(currentVaules.CourseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.CourseShortDesc);
                }
                if(currentVaules.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }
                if(currentVaules.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }
                if(currentVaules.CourseCategory._id !== course.category._id) {
                    formData.append("category", data.CourseCategory);
                }
                if(currentVaules.CourseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.CourseRequirements));
                }
                // if(currentVaules.courseTags.toString() !== course.tag.toString()) {
                //     formData.append("tag", data.courseTags);
                // }
                // if(currentVaules.CourseImage !== course.thumbnail) {
                //     formData.append("thumbnail", data.CourseImage);
                // }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result) {
                    setStep(2);
                    dispatch(setCourse(result));
                }
            } else {
                toast.error("No Changes made so far")
            }
            console.log("PRINTING FORMDATA: ", formData)
            console.log("PRINTING RESULT: ", result)
            return ;
        }

        // Create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.CourseRequirements));
        formData.append("status", COURSE_STATUS.DRAFT);
        // formData.append("tag", data.courseTags);
        // formData.append("thumbnail", data.courseImage);

        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if(result) {
            setStep(2);
            dispatch(setCourse(result));
        }
        setLoading(false);
        console.log("PRINTING FORMDATA: ", formData)
        console.log("PRINTING RESULT: ", result)
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}
        className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
    >
        <div className='flex flex-col'>
            <label htmlFor='courseTitle' className='label-style'>
                Course Title<sup className='text-pink-200'>*</sup>
            </label>
            <input
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required: true})}
                className='form-style'
            />
            {errors.courseTitle && (
                <span>Course Title is Required</span>
            )}
        </div>

        <div className='flex flex-col'>
            <label htmlFor='courseShortDesc' className='label-style'>
                Course Short Description<sup className='text-pink-200'>*</sup>
            </label>
            <textarea
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required: true})}
                // className='min-h-[140px] w-full'
                className='form-style min-h-[140px]'
            />
            {errors.courseShortDesc && (
                <span>Course Description is required</span>
            )}
        </div>

        <div className='relative flex flex-col'>
            <label htmlFor='coursePrice' className='label-style'>
                Course Price<sup className='text-pink-200'>*</sup>
            </label>
            <input
                id='coursePrice'
                placeholder={`Enter Course Price`}
                {...register("coursePrice", {
                    required: true
                })}
                className='form-style pl-10'
            />
            <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400 text-2xl left-1'/>
            {errors.coursePrice && (
                <span>Course Price is required</span>
            )}
        </div>

        <div className='flex flex-col'>
            <label htmlFor='courseCategory' className='label-style'>
                Course category<sup className='text-pink-200'>*</sup>
            </label>
            <select
                id='courseCategory'
                defaultValue=""
                {...register("courseCategory", {required: true})}
                className='form-style'
            >
                <option value="" disabled>
                    Choose a Category
                </option>
                {!loading && courseCategories.map( (category, index) => (
                    <option key={index} value={category?._id}>
                        {category?.name}
                    </option>
                ))}
            </select>
            {errors.courseCategory && (
                <span>Course Category is Required</span>
            )}
        </div>

        {/* Create a custom component for handling tags input */}
        {/* <ChipInput 
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        /> */}

        {/* Create a component for uploading and showing preview of media*/}
        {/* <Upload 
            name=
            label=
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        /> */}

        {/* Benefits of the course */}
        <div className='flex flex-col'>
            <label htmlFor='cousreBenefits' className='label-style'>
                Benefit of the course<sup className='text-pink-200'>*</sup>
            </label>
            <textarea 
                id='cousreBenefits'
                placeholder='Enter Benefits of the course'
                {...register("cousreBenefits", {required: true})}
                className='form-style min-h-[140px]'
            />
            {errors.cousreBenefits && (
                <span>Benefits of the course are required</span>
            )}
        </div>

        <RequirementField
            name="courseRequirements"
            label="requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />

        <div>
            {editCourse && (
                <button
                    onClick={() => dispatch(setStep(2))}
                    className='flex items-center gap-x-2 bg-richblack-300'
                >
                    Continue Without Saving
                </button>
            )}

            <IconBtn 
                text={!editCourse ? "Next" : "Save Changes"}
            />
        </div>
    </form>
  )
}

export default CourseInformationForm