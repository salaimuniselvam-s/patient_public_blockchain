import React, { useState } from "react";
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
  isDoctor,
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
        {(user == 1 || isDoctor) && (
          <div className="flex justify-center">
            <Button
              onClick={openModal}
              className="px-4 py-1 rounded-lg bg-blue-600 w-fit  font-bold hover text-white"
            >
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
            <Input readOnly={isDoctor} />
          </Form.Item>
          <Form.Item name="age" label="Age">
            <Input type="number" readOnly={isDoctor} />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Input type="gender" readOnly={isDoctor} />
          </Form.Item>
          <Form.Item name="blood" label="Blood Group">
            <Input readOnly={isDoctor} />
          </Form.Item>
          <Form.Item name="updatedby" label="updatedBy">
            <Input readOnly />
          </Form.Item>
          <Form.Item name="pharmacy" label="Pharmacy">
            <Input readOnly={!isDoctor} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input readOnly={!isDoctor} />
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

export default Patientinfocontainer;
