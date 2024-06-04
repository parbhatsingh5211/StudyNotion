import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm';

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
      <div className='flex'>
        {steps.map( (item) => (
            <>
              <div className='flex' key={item.id}>
                <div className={`${step === item.id
                  ? "bg-yellow-900 border-yellow-50 text-yellow-50" 
                  : "border-richblack-700 bg-richblack-800 text-richblack-300" }`}
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
      <div className='flex'>
        {steps.map( (item) => (
          <>
            <div key={item.id}>
              <p>{item.title}</p>
            </div>
          </>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {/* {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />} */}
    </>
  )
}

export default RenderSteps