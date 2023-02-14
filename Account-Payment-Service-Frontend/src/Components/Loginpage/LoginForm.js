import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { login } from "../../Service/apiCalls";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../Service/Ajax";

const LoginForm = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    login(values.email, values.password)
      .then(() => {
        navigate("/profile");
        window.location.reload();
        
      })
      .catch((response) => handleError(response));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ maxWidth: "50%", margin: "auto", textAlign: "left" }}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <p style={{ textAlign: "center" }}>
          Don't have the account? Register now <a href="/register"> here</a>
        </p>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            SignIn
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginForm;
