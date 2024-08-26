import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";

const { Title, Paragraph, Text } = Typography;

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = (values: { email: string; password: string }) => {
    console.log(values);
  };
  return (
    <div
      style={{
        width: "60%",
      }}
    >
      <Card>
        <div className="text-center">
          <img
            className="mb-3"
            src={
              "https://firebasestorage.googleapis.com/v0/b/kanban-2cf22.appspot.com/o/Group%201122.png?alt=media&token=7729da1a-914e-417e-b148-dba255de06a3"
            }
            alt=""
            style={{
              width: 48,
              height: 48,
            }}
          />
          <Title level={2}>Create an account</Title>
          <Paragraph type="secondary">Start your 30-day free trial</Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
          size="large"
        >
          <Form.Item
            name={"name"}
            label={"Name"}
            rules={[
              {
                required: true,
                message: "Please enter your name!!!",
              },
            ]}
          >
            <Input placeholder="Enter your name" allowClear />
          </Form.Item>
          <Form.Item
            name={"email"}
            label={"Email"}
            rules={[
              {
                required: true,
                message: "Please enter your email!!!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              allowClear
              maxLength={100}
              type="email"
            />
          </Form.Item>

          <Form.Item
            name={"password"}
            label={"Password"}
            rules={[
              {
                required: true,
                message: "Please enter your password!!!",
              },
            ]}
          >
            <Input.Password
              placeholder="Create a password"
              maxLength={100}
              type="password"
            />
          </Form.Item>
        </Form>

        <div className="mt-4 mb-3">
          <Button
            onClick={() => form.submit()}
            type="primary"
            style={{
              width: "100%",
            }}
            size="large"
          >
            Login
          </Button>
        </div>
        <SocialLogin />
        <div className="mt-3 text-center">
          <Space>
            <Text type="secondary">Already have an account?</Text>
            <Link to={"/"}>Login</Link>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
