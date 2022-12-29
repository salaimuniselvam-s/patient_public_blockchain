import React, { useState } from 'react';
import { Button, Card, Form, Input, Modal } from 'antd';
const Patientinfocontainer = ({ id,name, age, gender, blood, addr, timestamp, updatedby, description, pharmacy }) => {
    const [modal, setModal] = useState(false);
    const [object, setObject] = useState({
        id: id || "01",
        name: name || 'john',
        age: age || '24',
        gender: gender || 'male',
        bloodgroup: blood || 'o',
        addr: addr || "chennai",
        timestamp: timestamp || '28-12-22',
        updatedby: updatedby || 'Dr.rey',
        pharmacy: pharmacy || 'Apollo',
        description: description || 'All is well'
    })
    const handleUpdate = () => {
        setModal(false);
        alert("Data updated successfully")
    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setObject(prevVal => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }
    return (
        <>
            <Card className='bg-slate-300  w-full mt-3 '>
                <div className=' text-2xl font-bold'>Patient Id : {object.id }</div>
                <label className='mr-3'><span>Name : </span><span className=' font-semibold text-lg'>{object.name}</span></label>
                <label><span>Age :</span><span className=' font-semibold text-lg'>{object.age}</span></label>
                <br />
                <div className='flex  justify-evenly'>
                    <div className='flex  flex-col mr-6'>
                        <label><span>Blood Group:</span> <span className=' font-semibold text-lg'>{object.bloodgroup}</span></label>
                        <label><span>Gender : </span><span className=' font-semibold text-lg'>{object.gender}</span></label>
                        <label><span>Address :</span> <span className=' font-semibold text-lg'>{object.addr}</span></label>
                    </div>
                    <div className='flex-col flex mr-6'>
                        <label><span>Timestamp :</span><span className=' font-semibold text-lg'> {object.timestamp}</span></label>
                        <label><span>UpdatedBy : </span><span className=' font-semibold text-lg'>{object.updatedby}</span></label>
                        <label><span>Pharmacy:</span> <span className=' font-semibold text-lg'>{object.pharmacy}</span></label>
                    </div>
                </div>
                <br />
                <div>
                    <label>
                        <span>Description:  </span>
                        <span className=' font-semibold ml-1 text-lg'>{object.description}</span>
                    </label>
                </div>
                <br />
                <div className='flex justify-center'>
                    <Button onClick={() => setModal(true)} className='bg-blue-500'>Update</Button>
                </div>
            </Card>
            <Modal
                title="Update Personal Data"
                className=' bg-slate-500'
                open={modal}
                width="60vw"
                onCancel={() => setModal(false)}
                footer={null}>
                <Form>
                    <Form.Item><Input name="name" value={object.name} onChange={handleChange} /></Form.Item>
                    <Form.Item><Input type="number" name="age" value={object.age} onChange={handleChange} /></Form.Item>
                    <Form.Item><Input name='gender' type="gender" value={object.gender} onChange={handleChange} /></Form.Item>
                    <Form.Item><Input name='bloodgroup' value={object.bloodgroup} onChange={handleChange} /></Form.Item>
                    <Form.Item><Input name='updatedby' value={object.updatedby} onChange={handleChange} /></Form.Item>
                    <Form.Item><Input name='pharmacy' value={object.pharmacy} onChange={handleChange} /></Form.Item>
                    <Form.Item><Input name='description' value={object.description} onChange={handleChange} /></Form.Item>
                    <Form.Item><Input name='addr' value={object.addr} onChange={handleChange} /></Form.Item>
                    <Button className='bg-blue-500' onClick={handleUpdate}>Update</Button>
                </Form>
            </Modal>
        </>
    )
}

export default Patientinfocontainer
