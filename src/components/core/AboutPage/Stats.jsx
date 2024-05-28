import React from 'react'

const stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const Stats = () => {
  return (
    <section>
        <div >
            <div className='flex justify-around text-center lg:text-left w-full lg:px-32 lg:py-24 md:py-12 py-6 items-center bg-richblack-700'>
                {
                    stats.map( (data, index) => (
                        <div key={index}
                            className='flex flex-col justify-center items-center lg:w-[250px] w-[70px]'>
                            <h1 className='font-bold text-xl md:text-3xl text-center'>
                                {data.count}
                            </h1>
                            <h2 className='md:text-base text-richblack-500 text-[10px]'>
                                {data.label}
                            </h2>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default Stats