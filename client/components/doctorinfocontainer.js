import React, { useState } from 'react'
import { Card } from 'antd'
const Doctorinfocontainer = () => {
    const [object, setObject] = useState({
        name: 'Dr.Ray',
        age: '32',
        gender: 'Male',
        qualification: 'M.B.B.S., M.D.',
        hospitalname: "Dr.Rajaji Hospital",
        addr: 'Chennai',
        location: 'Near bus stand'
    })
  return (
      <>
             <Card className='bg-slate-300  w-full mt-3 '>
                    <div className=' text-2xl font-bold'>Doctor Details</div>
                    <label><span>Name : </span><span className=' font-semibold text-lg'>{object.name}</span></label>
                    <div className='flex  justify-evenly'>
                        <div className='flex  flex-col mr-6'>
                            <label><span>Qualification : </span><span className=' font-semibold text-lg'>{object.qualification}</span></label>
                            <label><span>Age :</span><span className=' font-semibold text-lg'>{object.age}</span></label>
                            <label><span>Gender : </span><span className=' font-semibold text-lg'>{object.gender}</span></label>
                        </div>
                        <div className='flex  flex-col mr-6'>
                            <label><span>Hospital :</span><span className=' font-semibold text-lg'>{object.hospitalname}</span></label>
                            <label><span>Address : </span><span className=' font-semibold text-lg'>{object.addr}</span></label>
                            <label><span>Location : </span><span className=' font-semibold text-lg'>{object.location}</span></label>

                        </div>
                    </div>
                </Card>
      </>
  )
}

export default Doctorinfocontainer;