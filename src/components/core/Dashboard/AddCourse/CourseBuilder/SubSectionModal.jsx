import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { MdClose } from 'react-icons/md';
import Upload from '../Upload'
import IconBtn from '../../../../common/IconBtn';

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
        getValues,
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    useEffect(() => {
        if(view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true;
        } else {
            return false;
        }

    }

    const handleEditSubSection = async() => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id)

        if(currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }
        if(currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }
        if(currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }

        setLoading(true);
        const result = await updateSubSection(formData, token);
        if(result) {
            // Todo same Check
            dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async(data) => {
        if(view)
            return;

        if(edit) {
            if(!isFormUpdated) {
                toast.error("No Changes made to the form")
            }
            else {
                // edit krdo store me
                handleEditSubSection();
            }
            return;
        }

        // Add
        const formData = new FormData();
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);

        setLoading(true);
        const result = await createSubSection(formData, token);

        if(result) {
            dispatch(setCourse(result));
        }
        setModalData(null);
        setLoading(false);
    }

  return (
    <div>
        <div>
            <div>
                <p>
                    {view && "Viewing"} 
                    {add && "Adding"} 
                    {edit && "editing"}
                    Lecture
                </p>
                <button onClick={() => (!loading ? setModalData(null) : {})}>
                    <MdClose />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Upload 
                    name="lectureVideo"
                    label ="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null}
                />
                <div>
                    <label htmlFor='lectureTitle'>Lecture Title</label>
                    <input 
                        id='lectureTitle'
                        placeholder='Enter Lecture Title'
                        {...register("lectureTitle", {required: true})}
                        className='w-full form-style'
                    />
                    {errors.lectureTitle && (
                        <span>
                            Lecture Title is required.
                        </span>
                    )}
                </div>
                <div>
                    <label htmlFor='lectureDesc'>Lecture Description</label>
                    <textarea
                        id='lectureDesc'
                        placeholder='Enter lecture Description'
                        {...register("lectureDesc", {required: true})}
                        className='w-full form-style min-h-[130px]'
                    />
                    {errors.lectureDesc && (
                        <span>
                            Lecture Description is required.
                        </span>
                    )}
                </div>

                {!view && (
                    <div>
                        <IconBtn
                            text={loading ? (<div className='spinner'></div>) : edit ? "Save Changes" : "Save"}
                        />
                    </div>
                )}
            </form>
        </div>
    </div>
  )
}

export default SubSectionModal