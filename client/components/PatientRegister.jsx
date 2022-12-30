import { Button, Form, Input, Select, Spin, notification } from "antd";
import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { formatString } from "../utils/ContractEnum";
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const PatientRegister = ({ requestAccess }) => {
  const { contract } = useGlobalContext();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = (result) => {
    requestAccess(result, AddPatient, setLoading);
  };
  const AddPatient = async (
    { name, age, gender, blood },
    setModal,
    setCloseModal
  ) => {
    try {
      const tx = await contract.addPatientRecord(
        formatString(name),
        age,
        formatString(gender),
        formatString(blood)
      );
      await tx.wait(1);
      api["success"]({
        message: "Details Updated Successfully",
        description: ``,
        duration: 1,
      });
      form.resetFields();
      setModal(false);
      setCloseModal(false);
    } catch (error) {
      console.error(error);
      api["error"]({
        message: "Record Update Failed",
        description: error.reason,
        duration: 2,
      });
    }
    setLoading(false);
  };
  return (
    <div className="mt-6 mb-1">
      {contextHolder}
      <Form {...formItemLayout} onFinish={onFinish} form={form}>
        <Form.Item name="name" label="Name">
          <Input required />
        </Form.Item>
        <Form.Item name="age" label="Age">
          <Input required type="number" />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="blood" label="Blood Group">
          <Input required />
        </Form.Item>
        <Button
          className="bg-blue-500 w-full items-center"
          type="primary"
          htmlType="submit"
        >
          {loading ? <Spin size="small" /> : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default PatientRegister;
