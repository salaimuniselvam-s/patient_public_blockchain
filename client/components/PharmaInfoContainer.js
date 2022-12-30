import React, { useState } from "react";
import { Button, Card, Form, Input, Modal } from "antd";
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
      <Card className="bg-slate-300  w-full mt-3 ">
        <div className="flex  justify-evenly">
          <div className="flex  flex-col mr-6">
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
          <Button className="bg-blue-500" type="primary" htmlType="submit">
            Update
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default PharmaInfoContainer;
