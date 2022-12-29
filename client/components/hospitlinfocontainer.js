import React, { useState } from 'react'
import Patientinfocontainer from './patientinfocontainer'
import { Card } from 'antd'
import Doctorinfocontainer from './doctorinfocontainer'
const Hospitlinfocontainer = () => {
  
    const details = [{
        id: '01',
        name: 'john',
        age: '24',
        gender: 'male',
        bloodgroup: 'AB+',
        addr: "chennai",
        timestamp: '28-12-22',
        updatedby: 'Dr.rey',
        pharmacy: 'Apollo',
        Description: 'All is well'
    }, {
        id: '02',
        name: 'Mah',
        age: '24',
        gender: 'Female',
        bloodgroup: 'B',
        addr: "chennai",
        timestamp: '28-12-22',
        updatedby: 'Dr.rey',
        pharmacy: 'Medplus',
        Description: 'All is well'
    },
    {
        id: '03',
        name: 'Asth',
        age: '24',
        gender: 'Female',
        bloodgroup: 'o',
        addr: "chennai",
        timestamp: '28-12-22',
        updatedby: 'Dr.Dev',
        pharmacy: 'Apollo',
        Description: 'All is well. Lungs are funtioning good. Tyroid is negative. Take care of ears.'
    }
    ]
    return (
        <>
            <div>
             <Doctorinfocontainer />
            </div>
            <div className='flex justify-center'>
                <div>{details.map((data, index) => {
                    return (
                        <div key={index}>
                            <Patientinfocontainer
                                id={data.id}
                                name={data.name}
                                age={data.age}
                                gender={data.gender}
                                blood={data.bloodgroup}
                                addr={data.addr}
                                timestamp={data.timestamp}
                                updatedby={data.updatedby}
                                pharmacy={data.pharmacy}
                                description={data.Description}
                            />
                        </div>
                    )
                })}
                </div>
            </div>
        </>
    )
}

export default Hospitlinfocontainer