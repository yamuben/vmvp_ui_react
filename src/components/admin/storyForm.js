import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Select,
  Col,
  DatePicker,
  Upload,
  TreeSelect,
  Switch,
} from "antd";

import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const StoryForm = ({}) => {
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = (value) => {
    console.log("@@@@", value);
  };

  // problemOne:String,
  // problemTwo:String,
  // picture:String,
  // dream:String,

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
          <Form.Item label="Names" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Picture">
            <Form.Item
              name="picture"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input Summary about you!",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
        </Col>
        <Col span={2} style={{ textAlign: "center" }}>
          <Form.Item>
            <Button htmlType="submit">Save</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default StoryForm;
