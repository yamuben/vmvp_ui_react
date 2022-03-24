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
  notification,
  Switch,
} from "antd";

import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import VmvpApis from "../../services/ApiUrli";

const StoryForm = ({story,update}) => {
  const [loading, setLoading]= useState(false);
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
    setLoading(true);
    let res;
    if (update) {
      console.log(":::::::::::", story);
      res = await VmvpApis.updateStory(story?._id, {
        ...story,
        ...value,
        picture: !value.pict
          ? story?.picture
          : value?.pict[0]?.response?.secure_url,
        dateOfBirth: !value?.dateOfBirth
          ? story?.dateOfBirth
          : value?.dateOfBirth,
      });
    } else {
      res = await VmvpApis.createStory({
        ...value,
        picture: value?.pict[0].response.secure_url,
      });
    }
    //  console.log("rrrrrreeeeeesssss",res)
    if (res.status === 200) {
      setLoading(false);
      notification.success({ message: "Success registered!" });
      window.location.reload();
    } else {
      setLoading(false);
      notification.error({ message: "Failed to register Child" });
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
          <Form.Item label="Names" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Picture">
            <Form.Item
              name="pict"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger name="files" action="https://vmvp-api.herokuapp.com/api/v1/students/photo">
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
            <Input.TextArea showCount maxLength={500} />
          </Form.Item>
        </Col>
        <Col span={2} style={{ textAlign: "center" }}>
          <Form.Item>
          <Button htmlType="submit" loading={loading}>
              {update ? "Update" : "Register"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default StoryForm;
