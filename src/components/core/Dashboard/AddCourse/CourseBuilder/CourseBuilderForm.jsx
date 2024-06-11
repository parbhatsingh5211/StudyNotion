import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { MdAddCircleOutline, MdNavigateNext } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';

const CourseBuilderForm = () => {

  const { register, handleSubmit, setValue, formState: {errors}, } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async(data) => {
    setLoading(true);
    let result;
    
    if(editSectionName) {
      // we are editing the section name
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      }, token)
    } else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token)
    }

    // Update Value
    if(result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  }

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "")
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    if(course?.courseContent?.length === 0) {
      toast.error("Please add atleast One Section");
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section.");
      return;
    }
    // if everything is good
    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className='text-richblack-5 flex flex-col gap-4'>
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <div>
          <label htmlFor='sectionName'>
            Section Name <sup className='text-pink-200'>*</sup>
          </label>
          <input 
            id='sectionName'
            placeholder='Add Section Name'
            {...register("sectionName", {required: true})}
            className='w-full form-style'
          />
          {errors.sectionName && (
            <span>Section Name is required</span>
          )}
        </div>

        <div className='flex gap-2'>
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-richblack-5"}
          >
            <MdAddCircleOutline className='text-yellow-50' size={20}/>
          </IconBtn>
          {editSectionName && (
            <button
              type='button'
              onClick={cancelEdit}
              className='text-sm text-richblack-300 underline'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
      )}
      <div className='flex justify-end gap-x-3 mt-10'>
        <button
          onClick={goBack}
          className='rounded-md cursor-pointer flex items-center'
        >Back</button>
        <IconBtn text="next" onClick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm