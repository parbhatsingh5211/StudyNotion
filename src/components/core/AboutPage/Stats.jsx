import React from 'react'

const stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const Stats = () => {
  return (
    <section className="bg-richblack-700 border-b-[1px] border-richblack-500">
        <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
            <div className="grid grid-cols-4 md:grid-cols-4 text-center">
                {stats.map( (data, index) => (
                    <div key={index} className="flex flex-col py-10">
                        <h1 className="text-[30px] font-bold text-richblack-5">
                            {data.count}
                        </h1>
                        <h2 className="font-semibold xl:text-[16px] text-[10px] text-richblack-500">
                            {data.label}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Stats