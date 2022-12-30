import React, { useState } from "react";
import { Button, Card, Form, Input, Modal } from "antd";
const Doctorinfocontainer = ({
  name,
  age,
  gender,
  qualification,
  hospitalname,
  addr,
  location,
  updateRecords,
  user,
}) => {
  const [form] = Form.useForm();
  const [modal, setModal] = useState(false);

  const onFinish = (value) => {
    updateRecords(value, setModal);
  };
  const openModal = () => {
    setModal(true);
    form.setFieldsValue({
      name,
      age,
      gender,
      qualification,
      hospitalname,
      addr,
      location,
    });
  };
  return (
    <>
      <Card className="bg-slate-300  w-full mt-3 ">
        <div className=" text-2xl font-bold">Doctor Details</div>
        <label>
          <span>Name : </span>
          <span className=" font-semibold text-lg">{name}</span>
        </label>
        <div className="flex  justify-evenly">
          <div className="flex  flex-col mr-6">
            <label>
              <span>Qualification : </span>
              <span className=" font-semibold text-lg">{qualification}</span>
            </label>
            <label>
              <span>Age :</span>
              <span className=" font-semibold text-lg">{age}</span>
            </label>
            <label>
              <span>Gender : </span>
              <span className=" font-semibold text-lg">{gender}</span>
            </label>
          </div>
          <div className="flex  flex-col mr-6">
            <label>
              <span>Hospital :</span>
              <span className=" font-semibold text-lg">{hospitalname}</span>
            </label>
            <label>
              <span>Address : </span>
              <span className=" font-semibold text-lg">{addr}</span>
            </label>
            <label>
              <span>Location : </span>
              <span className=" font-semibold text-lg">{location}</span>
            </label>
          </div>
          {user == 2 && (
            <div className="flex justify-center">
              <Button
                onClick={openModal}
                className="px-4 py-1 rounded-lg bg-blue-600 w-fit  font-bold hover text-white"
              >
                Update
              </Button>
            </div>
          )}
        </div>
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
          <Form.Item name="qualification" label="Qualification">
            <Input />
          </Form.Item>
          <Form.Item name="hospitalname" label="HospitalName">
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input />
          </Form.Item>
          <Form.Item name="addr" label="Address">
            <Input readOnly />
          </Form.Item>
          <Button className="bg-blue-500" type="primary" htmlType="submit">
            Update
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default Doctorinfocontainer;
