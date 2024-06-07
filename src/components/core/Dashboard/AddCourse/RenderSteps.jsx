import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';

const RenderSteps = () => {

  const { step } = useSelector( (state) => state.course); 

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      <div className='grid grid-cols-3 mx-auto'>
        {steps.map( (item) => (
            <>
              <div className='flex' key={item.id}>
                <div className={`${step === item.id
                  ? "bg-yellow-900 border-yellow-50 text-yellow-50" 
                  : "border-richblack-700 bg-richblack-800 text-richblack-300" }
                  w-[25px] h-[25px] text-center rounded-full text-xl`}
                >
                  {
                    step > item.id ? (<FaCheck />) : (item.id)
                  }
                </div>
                {item.id !== steps.length && (
                  <div className={`${step === item.id
                    ? "text-yellow-50" : "text-richblack-300"}`}
                  >
                    --------------------
                  </div>
                )}
              </div>  
            </>
        ))}
      </div>
      <div className='grid grid-cols-3 text-sm text-richblack-100'>
        {steps.map( (item) => (
          <>
            <div key={item.id}
              className={`${item.id === 1 && "ml-2 lg:ml-16"}
                ${item.id === 3 && "-ml-5 lg:-ml-10"}`}
            >
              <p>{item.title}</p>
            </div>
          </>
        ))}
      </div>

      <div className='mt-7'>
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {/* {step === 3 && <PublishCourse />} */}
      </div>
    </>
  )
}

export default RenderSteps