import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Select,
  Col,
  InputNumber,
  notification,
} from "antd";
import VmvpApis from "../../services/ApiUrli";
const { Option } = Select;
const SponsorForm = ({ child }) => {
  const [componentSize, setComponentSize] = useState("default");
  const [loading, setLoading] = useState(false);
  const onFinish = async (value) => {
    setLoading(true);
    console.log("@@@@", value, child);
    const res = await VmvpApis.createSponsor(child?._id, value);
    if (res.status === 200) {
      notification.success({
        message: "Thanks for Applying! We reach out you soon!",
      });
      setLoading(false);
    } else {
      setLoading(false);
      notification.error({ message: "Failed to Apply! Please try again!" });
    }
  };
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
        defaultValue={"USD"}
      >
        <Option value="USD">$</Option>
        {/* <Option value="Rwf">Rwf</Option> */}
      </Select>
    </Form.Item>
  );

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onFinish={onFinish}
      size={componentSize}
    >
      <Row gutter={24}>
        <Col span={11}>
          <Form.Item
            label="Names"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Names",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input Email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone ">
            <Input />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true,
                message: "Please input Country",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="donation"
            label="Donation"
            rules={[
              {
                required: true,
                message: "Please input donation amount!",
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        </Col>
        <Col span={2} style={{ textAlign: "center" }}>
          <Form.Item>
            <Button type="primary" style={{background:"green"}}  htmlType="submit" loading={loading}>APPLY</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SponsorForm;
