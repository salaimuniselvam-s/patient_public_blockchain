import { Card } from 'antd'
import React from 'react'
const Pharmainfocontainer = () => {
    const [object, setObject] = useState({
        name: 'Apollo',
        street: 'Street',
        address: 'Chennai',
        location : 'Near bus stand'
      })
    return (
        <>
            <Card className='bg-slate-300  w-full mt-3 '>
                <div className='flex  justify-evenly'>
                    <div className='flex  flex-col mr-6'>
                        <label><span>Name : </span><span className=' font-semibold text-lg'>{object.name}</span></label>
                        <label><span>Street :</span><span className=' font-semibold text-lg'>{object.street}</span></label>
                        <label><span>Address : </span><span className=' font-semibold text-lg'>{object.address}</span></label>
                        <label><span>Location : </span><span className=' font-semibold text-lg'>{object.location}</span></label>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default Pharmainfocontainer