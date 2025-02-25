import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";

const { Title, Paragraph, Text } = Typography;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = (values: { email: string; password: string }) => {
    console.log(values);
  };
  return (
    <div
      style={{
        width: "70%",
      }}
    >
      <Card>
        <div className="text-center">
          <Title level={2}>Login to your account</Title>
          <Paragraph type="secondary">
            Welcome back! Please enter your detail.
          </Paragraph>
        </div>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleLogin}
          disabled={isLoading}
          size="large"
        >
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
              placeholder="Enter your password"
              maxLength={100}
              type="password"
            />
          </Form.Item>
        </Form>

        <div className="row">
          <div className="col">
            <Checkbox
              value={isRemember}
              onChange={(val) => setIsRemember(val.target.value)}
            >
              Remember for 30 days
            </Checkbox>
          </div>
          <div className="col text-end">
            <Link to={"/"}>Forgot password!</Link>
          </div>
        </div>

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
            <Text type="secondary">Don't have an account?</Text>
            <Link to={"/sign-up"}>Sign Up</Link>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default Login;
