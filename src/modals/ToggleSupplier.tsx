import {
  Avatar,
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Typography,
} from "antd";
import { User } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { colors } from "../constants/colors";
import { uploadFile } from "../utils/uploadFile";
import { replaceName } from "../utils/replaceName";
import handleAPI from "../apis/handleAPI";
import { SupplierModel } from "../models/SupplierModel";
import { demodata } from "../data/demodata";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAddNew: (val: SupplierModel) => void;
  supplier?: SupplierModel;
}

const { Paragraph } = Typography;

const ToggleSupplier = (props: Props) => {
  const { visible, onAddNew, onClose, supplier } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isTaking, setIsTaking] = useState<boolean>();
  const [file, setFile] = useState<any>();

  const [form] = Form.useForm();
  const inpRef = useRef<any>();

  useEffect(() => {
    if (supplier) {
      form.setFieldsValue(supplier);

      setIsTaking(supplier.isTaking === 1);
    }
  }, [supplier]);

  const addNewSupplier = async (values: any) => {
    setIsLoading(true);

    const data: any = {};
    const api = `/supplier/${
      supplier ? `update?id=${supplier._id}` : "add-new"
    }`;

    for (const i in values) {
      data[i] = values[i] ?? "";
    }

    data.price = values.price ? parseInt(values.price) : 0;

    data.isTaking = isTaking ? 1 : 0;

    if (file) {
      data.photoUrl = await uploadFile(file);
    }

    data.slug = replaceName(values.name);

    try {
      const res: any = await handleAPI(api, data, supplier ? "put" : "post");
      message.success(res.message);
      !supplier && onAddNew(res.data);
      handleClose();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setFile(undefined);
    onClose();
  };

  return (
    <Modal
      closable={!isLoading}
      open={visible}
      onClose={handleClose}
      onCancel={handleClose}
      onOk={() => form.submit()}
      okButtonProps={{
        loading: isLoading,
      }}
      title={supplier ? "Update" : "Add Supplier"}
      okText={supplier ? "Update" : "Add Supplier"}
      cancelText="Discard"
    >
      <label
        htmlFor="inpFile"
        className="p-2 mb-3 d-flex align-items-center justify-content-center gap-5"
      >
        {file ? (
          <Avatar size={100} src={URL.createObjectURL(file)} />
        ) : supplier ? (
          <Avatar size={100} src={supplier.photoUrl} />
        ) : (
          <Avatar
            size={100}
            style={{
              backgroundColor: "white",
              border: "2px dashed #e0e0e0",
            }}
          >
            <User size={60} color={colors.gray600} />
          </Avatar>
        )}
        <div className="ml-3">
          <Paragraph className="text-muted m-0 text-center">
            Drag image here
          </Paragraph>
          <Paragraph className="text-muted mt-1 mb-0 text-center">Or</Paragraph>
          <Button onClick={() => inpRef.current.click()} type="link">
            Browse image
          </Button>
        </div>
      </label>
      <Form
        disabled={isLoading}
        onFinish={addNewSupplier}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        size="large"
      >
        <Form.Item
          name={"name"}
          rules={[
            {
              required: true,
              message: "Enter supplier name",
            },
          ]}
          label="Supplier Name"
        >
          <Input placeholder="Enter supplier name" allowClear />
        </Form.Item>
        <Form.Item name={"product"} label="Product">
          <Input placeholder="Enter product" allowClear />
        </Form.Item>
        <Form.Item name={"email"} label="Email">
          <Input placeholder="Enter your email" allowClear type="email" />
        </Form.Item>
        <Form.Item name={"active"} label="Active">
          <Input placeholder="" allowClear type="number" />
        </Form.Item>
        <Form.Item name={"categories"} label="Category">
          <Select options={[]} placeholder="Select product category" />
        </Form.Item>
        <Form.Item name={"price"} label="Buying Price">
          <Input placeholder="Enter buying price" type="number" allowClear />
        </Form.Item>
        <Form.Item name={"contact"} label="Contact Number">
          <Input placeholder="Enter supplier contact number" />
        </Form.Item>
        <Form.Item label="Type">
          <div className="mb-3">
            <Button
              size="middle"
              onClick={() => setIsTaking(false)}
              type={isTaking === false ? "primary" : "default"}
            >
              Not taking return
            </Button>
          </div>
          <Button
            size="middle"
            onClick={() => setIsTaking(true)}
            type={isTaking ? "primary" : "default"}
          >
            Taking return
          </Button>
        </Form.Item>
      </Form>
      <div className="d-none">
        <input
          ref={inpRef}
          accept="image/*"
          type="file"
          name=""
          id="inpFile"
          onChange={(val: any) => setFile(val.target.files[0])}
        />
      </div>
    </Modal>
  );
};

export default ToggleSupplier;
