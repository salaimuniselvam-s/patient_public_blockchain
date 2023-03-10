import React, { useState } from "react";
import { Button, Card, Form, Input, Modal, Select, Spin, message } from "antd";
import { formItemLayout } from "./PatientRegister";
import { useGlobalContext } from "../context";
import { Owner } from "../utils/ContractEnum";
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
  pharmacyAddress = [],
  getAllPatientRecords,
}) => {
  const { walletAddress, chainId, ownerContract } = useGlobalContext();
  const [form] = Form.useForm();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [revokeLoading, setRevokeLoading] = useState(false);

  const onFinish = (value) => {
    updateRecords(value, setModal, setLoading);
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
  const revokeUser = async (addr) => {
    setRevokeLoading(true);
    try {
      const tx = await ownerContract.revokeUser(addr);
      tx.wait(1);
      message.success(
        `${walletAddress} is Successfully Removed from the records`
      );
      await getAllPatientRecords();
    } catch (error) {
      console.error(error);
      message.error("Revoke Failed.. Please Try Again..");
    } finally {
      setRevokeLoading(false);
    }
  };
  return (
    <>
      <Card className="bg-slate-300 text-xl  w-full mt-2 ">
        <div className=" text-2xl font-bold mb-1">Patient Id : {id}</div>
        <div>
          <div></div>
          <div className="grid grid-cols-2 gap-2 justify-between">
            <label>
              <span>Name : </span>
              <span className=" font-semibold text-lg">{name}</span>
            </label>
            <label>
              <span>Age :</span>
              <span className=" font-semibold text-lg">{age}</span>
            </label>
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

            <label>
              <span>Description: </span>
              <span className=" font-semibold ml-1 text-lg">{description}</span>
            </label>
          </div>
        </div>

        <br />
        {(user == 1 || isDoctor) && (
          <div className="flex justify-center">
            <Button
              onClick={openModal}
              className="px-4 py-1 rounded-lg bg-blue-600 w-fit  font-bold hover text-white"
            >
              {isDoctor ? "Prescribe" : "Update"}
            </Button>
          </div>
        )}
        {walletAddress.toString().toLowerCase() ==
          Owner(chainId).toLowerCase() && (
          <div className="flex justify-center">
            <Button
              onClick={() => revokeUser(addr)}
              className="px-4 py-1 rounded-lg bg-blue-600 w-fit  font-bold hover text-white"
            >
              {revokeLoading ? <Spin size="small" /> : "Revoke User"}
            </Button>
          </div>
        )}
      </Card>
      <Modal
        title={isDoctor ? "Update Patient Details" : "Update Personal Details"}
        open={modal}
        width="60vw"
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
            <Select disabled={!isDoctor}>
              {pharmacyAddress.map((data, index) => {
                return (
                  <Select.Option value={data} key={index}>
                    {data}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input readOnly={!isDoctor} />
          </Form.Item>
          <Form.Item name="addr" label="Address">
            <Input readOnly />
          </Form.Item>
          <div className="flex justify-center mb-3">
            <Button className="bg-blue-500 " type="primary" htmlType="submit">
              {loading ? <Spin size="small" /> : "Update"}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Patientinfocontainer;
