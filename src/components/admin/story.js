import React, { useState, useEffect } from "react";
import { Card, Drawer, Table, Tag, Space, Collapse, notification } from "antd";
import StoryForm from "./storyForm";
import VmvpApis from "../../services/ApiUrli";
import SingleStory from "./getOne/Story";

const { Panel } = Collapse;
const Story = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [teamFormTitle, setStoryFormTitle] = useState("Add New Story ");
  const [data, setData] = useState([]);
  const [selectedStory, setSelectedStory] = useState({});
  const onDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  const handleStoryStatus = async (id, data) => {
    const res = await VmvpApis.updateStory(id, data);
    if (res.status === 200) {
      window.location.reload();
    } else {
      notification.error({ message: "failed to change activation" });
    }
  };
  useEffect(() => {
    VmvpApis.getAllStories().then((res) => setData(res?.data.data));
  }, []);
  const columns = [
    {
      title: "Names",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (r) => (
        <Tag color={r ? "green" : "red"} key={r}>
          {" "}
          {r ? "Visible" : "Hidden"}{" "}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setSelectedStory(record);
              setIsDrawerVisible(true);
            }}
          >
            View
          </a>
          {record?.status ? (
            <a
              onClick={() => handleStoryStatus(record?._id, { status: false })}
            >
              Hide
            </a>
          ) : (
            <a
              onClick={() => handleStoryStatus(record?._id, { status: true })}
            >
              Show
            </a>
          )}
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
        size="large"
        title="Story"
        placement="right"
        onClose={onDrawerClose}
        visible={isDrawerVisible}
      >
        <SingleStory singleStory={selectedStory} />
      </Drawer>
    </>
  );
};

export default Story;
