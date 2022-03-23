import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Row,
  Col,
  notification,
} from "antd";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    if (
      values?.username === "vmvp.org@gmail.com" &&
      values?.password === "admin123"
    ) {
      return navigate("/admin");
    } else {
      return notification.error({
        message: "Failed to Login! Wrong cridentials!",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Card>
      <Row gutter={24}>
        <Col span={9}> </Col>
        <Col span={6}>
          <Card style={{ textAlign: "center" }}>
            <h1>VMVP ADMIN LOGIN</h1>
          </Card>
          <Card style={{ textAlign: "center" }}>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
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
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={9}> </Col>
      </Row>
    </Card>
  );
};
export default Home;
