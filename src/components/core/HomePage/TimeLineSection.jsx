import React from 'react'

import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeline = [
    {
        Logo: logo1,
        Heading: "Leadership",
        Description: "Fully commited to the success company"
    },
    {
        Logo: logo2,
        Heading: "Responsiblity",
        Description: "Student willl always be our top priority"
    },
    {
        Logo: logo3,
        Heading: "Flexiblity",
        Description: "The ability to switch is an important skills"
    },
    {
        Logo: logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution"
    },
]

const TimeLineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-15 items-center justify-between mb-[80px]'>
            <div className=' flex flex-col gap-5'>
                {
                    timeline.map( (element, index) => {
                        return(
                            <div key={index}>
                                <div className='flex flex-row gap-6'>
                                    <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full'>
                                        <img src={element.Logo} alt='logo'/>
                                    </div>
                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                        <p className='text-base'>{element.Description}</p>
                                    </div>
                                </div>
                                {
                                    index < 3 ? (
                                        <div className='h-[50px] border-l-2 border-dotted opacity-30 ml-6 mt-3 -mb-2'></div>
                                    ) : (
                                        <div></div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className='relative shadow-blue-100'>
                <img src={timelineImage} 
                alt='timelineImage'
                className='shadow-white object-cover h-fit'
                />

                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 
                    left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Type of Courses </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimeLineSection