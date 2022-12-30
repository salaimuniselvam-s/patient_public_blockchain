import React, { useState } from "react";
import { Button, Card, Form, Input, Modal } from "antd";
import { formItemLayout } from "./PatientRegister";
const PharmaInfoContainer = ({
  name,
  street,
  location,
  addr,
  user,
  updateRecords,
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
      street,
      location,
      addr,
    });
  };
  return (
    <>
      <Card className="bg-slate-300 text-xl  w-full mt-3 ">
        <div>
          <div className="grid grid-cols-2 gap-2 justify-between">
            <label>
              <span>Name : </span>
              <span className=" font-semibold text-lg">{name}</span>
            </label>
            <label>
              <span>Street :</span>
              <span className=" font-semibold text-lg">{street}</span>
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
        </div>
        {user == 3 && (
          <div className="flex justify-center mt-3">
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
        open={modal}
        width="60vw"
        height="auto"
        onCancel={() => setModal(false)}
        footer={null}
      >
        <Form
          {...formItemLayout}
          onFinish={onFinish}
          form={form}
          name="PatientRecords"
        >
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="street" label="Street">
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input />
          </Form.Item>
          <Form.Item name="addr" label="Address">
            <Input readOnly />
          </Form.Item>
          <div className="flex justify-center mb-3">
            <Button className="bg-blue-500 " type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default PharmaInfoContainer;
