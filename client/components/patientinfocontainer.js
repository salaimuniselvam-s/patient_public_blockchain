import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Modal } from "antd";
const Patientinfocontainer = ({
  id,
  name,
  age,
  gender,
  blood,
  addr,
  timestamp,
  updatedby,
  description,
  pharmacy,
  user,
  updateRecords,
}) => {
  const [form] = Form.useForm();
  const [modal, setModal] = useState(false);

  const onFinish = (value) => {
    updateRecords(value, setModal);
  };

  const handleChange = (event) => {
    // const { name, value } = event.target;
    // setObject((prevVal) => {
    //   return {
    //     ...prevVal,
    //     [name]: value,
    //   };
    // });
  };
  const openModal = () => {
    setModal(true);
    form.setFieldsValue({
      name,
      age,
      gender,
      blood,
      addr,
      timestamp,
      updatedby,
      description,
      pharmacy,
    });
  };
  return (
    <>
      <Card className="bg-slate-300  w-full mt-3 ">
        <div className=" text-2xl font-bold">Patient Id : {id}</div>
        <label className="mr-3">
          <span>Name : </span>
          <span className=" font-semibold text-lg">{name}</span>
        </label>
        <label>
          <span>Age :</span>
          <span className=" font-semibold text-lg">{age}</span>
        </label>
        <br />
        <div className="flex  justify-evenly">
          <div className="flex  flex-col mr-6">
            <label>
              <span>Blood Group:</span>{" "}
              <span className=" font-semibold text-lg">{blood}</span>
            </label>
            <label>
              <span>Gender : </span>
              <span className=" font-semibold text-lg">{gender}</span>
            </label>
            <label>
              <span>Address :</span>{" "}
              <span className=" font-semibold text-lg">{addr}</span>
            </label>
          </div>
          <div className="flex-col flex mr-6">
            <label>
              <span>Timestamp :</span>
              <span className=" font-semibold text-lg"> {timestamp}</span>
            </label>
            <label>
              <span>UpdatedBy : </span>
              <span className=" font-semibold text-lg">{updatedby}</span>
            </label>
            <label>
              <span>Pharmacy:</span>{" "}
              <span className=" font-semibold text-lg">{pharmacy}</span>
            </label>
          </div>
        </div>
        <br />
        <div>
          <label>
            <span>Description: </span>
            <span className=" font-semibold ml-1 text-lg">{description}</span>
          </label>
        </div>
        <br />
        {user == 1 && (
          <div className="flex justify-center">
            <Button onClick={openModal} className="bg-blue-500 text-white">
              Update
            </Button>
          </div>
        )}
      </Card>
      <Modal
        title="Update Personal Data"
        className=" bg-slate-500"
        open={modal}
        width="60vw"
        onCancel={() => setModal(false)}
        footer={null}
      >
        <Form onFinish={onFinish} form={form} name="PatientRecords">
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Input type="gender" />
          </Form.Item>
          <Form.Item name="blood" label="Blood Group">
            <Input />
          </Form.Item>
          <Form.Item name="updatedby" label="updatedBy">
            <Input />
          </Form.Item>
          <Form.Item name="pharmacy" label="Pharmacy">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item name="addr" label="Address">
            <Input />
          </Form.Item>
          <Button className="bg-blue-500" type="primary" htmlType="submit">
            Update
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default Patientinfocontainer;
