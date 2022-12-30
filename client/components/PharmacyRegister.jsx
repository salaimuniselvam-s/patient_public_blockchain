import { Button, Form, Input, Select, notification } from "antd";
import React from "react";
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

const PharmacyRegister = ({requestAccess}) => {
  const { contract } = useGlobalContext();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const onFinish = (result) => {
    requestAccess(result, AddPatient);
  };
  const AddPatient = async (
    { name, street, location },
    setModal,
    setCloseModal
  ) => {
    try {
      const tx = await contract.addPharmacyRecord(
        formatString(name),
        formatString(street),
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
  };
  return (
    <div className="mt-6 mb-1">
      {contextHolder}
      <Form {...formItemLayout} onFinish={onFinish} form={form}>
        <Form.Item name="name" label="Name">
          <Input required />
        </Form.Item>
        <Form.Item name="street" label="Street">
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
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PharmacyRegister;
