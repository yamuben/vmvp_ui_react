import React, { useState } from "react";
import axios from "axios";
import VmvpApis from "../../services/ApiUrli";
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
  notification,
  Switch,
} from "antd";

import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const StudentForm = ({}) => {
  const [loading,setLoading]=useState(false)
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

  const onFinish = async(value) => {
    console.log("@@@@", value);
setLoading(true)
   const res= await VmvpApis.createStudent({...value,picture:value?.pict[0].response.secure_url})
  //  console.log("rrrrrreeeeeesssss",res)
  if(res.status===200){
    setLoading(false)
    notification.success({message:"Success registered!"})
    window.location.reload()
  }
  else{
    setLoading(false)
    notification.error({message:"Failed to register Child"})
 

  }
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
          <Form.Item
            label="Names"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Intro",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Class"
            name="class"
            rules={[
              {
                required: true,
                message: "Please input Intro",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Select>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="male">Male</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date Of Birth"
            name="dateOfBirth"
            rules={[
              {
                required: true,
                message: "Please input Intro",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item label="Picture">
            <Form.Item
              name="pict"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger
                name="files"
                action="http://localhost:4047/api/v1/students/photo"
              >
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
            name="problemOne"
            label="Problem 1"
            rules={[
              {
                required: true,
                message: "Please input Intro",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item name="problemTwo" label="Problem 2">
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            name="dream"
            label="Dreams"
            rules={[
              {
                required: false,
                message: "Please input Intro",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
        </Col>
        <Col span={2} style={{ textAlign: "center" }}>
          <Form.Item>
            <Button htmlType="submit" loading={loading}>Save</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default StudentForm;
