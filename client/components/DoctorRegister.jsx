import { Button, Form, Input, Select, Spin, notification } from "antd";
import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { formatString } from "../utils/ContractEnum";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const DoctorRegister = ({ requestAccess }) => {
  const { contract } = useGlobalContext();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = (result) => {
    requestAccess(result, AddDoctor, setLoading);
  };
  const AddDoctor = async (
    { name, age, gender, qualification, hospitalname, location },
    setModal,
    setCloseModal
  ) => {
    try {
      const tx = await contract.addDoctorRecord(
        formatString(name),
        age,
        formatString(gender),
        formatString(qualification),
        formatString(hospitalname),
        formatString(location)
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
        <Form.Item name="qualification" label="Qualification">
          <Input required />
        </Form.Item>
        <Form.Item name="hospitalname" label="Hospital Name">
          <Input required />
        </Form.Item>
        <Form.Item name="location" label="Location">
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

export default DoctorRegister;
