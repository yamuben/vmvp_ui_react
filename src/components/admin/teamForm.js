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
  notification,
  TreeSelect,
  Switch,
} from "antd";
import VmvpApis from "../../services/ApiUrli";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
const TeamForm = ({ teamMate, update }) => {
  const [loading, setLoading] = useState(false);
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

  const onFinish = async (value) => {
    setLoading(true);
    const _value = {
      ...value,
      socialMedia: {
        linkedin: value?.linkedin,
        facebook: value?.facebook,
        instagram: value?.instagram,
        twitter: value?.twitter,
      },
    };
    // console.log("@@###@@", _value);
    let res;
    if (update) {
      res = await VmvpApis.updateTeamMate(teamMate?._id, {
        ...teamMate,
        ..._value,
        picture: !value.pict
          ? teamMate?.picture
          : value?.pict[0]?.response?.secure_url,
      });
    } else {
      res = await VmvpApis.createTeam({
        ..._value,
        picture: value?.pict[0].response.secure_url,
      });
    }

    if (res.status === 200) {
      setLoading(false);
      notification.success({ message: "Team Mate added Success!" });
      window.location.reload();
    } else {
      setLoading(false);
      notification.error({ message: "Failed to register! Try Again" });
    }
  };

  // problemOne:String,
  // problemTwo:String,
  // picture:String,
  // dream:String,

  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        name: teamMate?.name,
        title: teamMate?.title,
        description: teamMate?.description,
        facebook: teamMate?.socialMedia.facebook,
        linkedin: teamMate?.socialMedia.linkedin,
        instagram: teamMate?.socialMedia.instagram,
        twitter: teamMate?.socialMedia.twitter,
      }}
      onFinish={onFinish}
      size={componentSize}
    >
      <Row gutter={24}>
        <Col span={10}>
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
            label="Title"
            name="title"
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
            label="Role"
            name="role"
            initialValue={teamMate?.role}
            rules={[
              {
                required: true,
                message: "Please select role",
              },
            ]}
          >
            <Select>
              <Select.Option value="board">Board Member</Select.Option>
              <Select.Option value="team">Team Member</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Picture">
            <Form.Item
              name="pict"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
              rules={[
                {
                  required: update ? false : true,
                  message: "Please upload Picture",
                },
              ]}
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
        <Col span={10}>
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

          <Form.Item label="Facebook" name="facebook">
            <Input placeholder="facebook link" />
          </Form.Item>
          <Form.Item label="Instagram" name="instagram">
            <Input placeholder="instagram link" />
          </Form.Item>
          <Form.Item label="Twitter" name="twitter">
            <Input placeholder="twitter link" />
          </Form.Item>
          <Form.Item label="Linkedin" name="linkedin">
            <Input placeholder="linkedin link" />
          </Form.Item>
        </Col>
        <Col span={4} style={{ textAlign: "center" }}>
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

export default TeamForm;
