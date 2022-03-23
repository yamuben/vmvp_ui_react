import React, { useState } from "react";
import { Card, Drawer, Table, Tag, Space, Collapse } from "antd";
import data from "../../assets/table/student";
import StoryForm from "./storyForm";

const { Panel } = Collapse;
const Story = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [teamFormTitle, setStoryFormTitle] = useState("Add New Story ");
  const onDrawerClose = () => {
    setIsDrawerVisible(false);
  };
  const columns = [
    {
      title: "Names",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Role",
      key: "isAvailable",
      dataIndex: "isAvailable",
      render: (r) => (
        <Tag color={r ? "green" : "red"} key={r}>
          {" "}
          {r ? "green" : "red"}{" "}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "isAvailable",
      dataIndex: "isAvailable",
      render: (r) => (
        <Tag color={r ? "green" : "red"} key={r}>
          {" "}
          {r ? "green" : "red"}{" "}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => setIsDrawerVisible(true)}>View</a>
          <a>Hide</a>
          <a>Edit</a>
        </Space>
      ),
    },
  ];
  return (
    <>
      {" "}
      <Card>
        <Collapse>
          <Panel header={teamFormTitle} key="1">
            <StoryForm />
          </Panel>
        </Collapse>

        <br></br>
        <Card hoverable title="List Of Stories" bordered={true}>
          <Table columns={columns} dataSource={data} />
        </Card>
      </Card>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onDrawerClose}
        visible={isDrawerVisible}
      ></Drawer>
    </>
  );
};

export default Story;
