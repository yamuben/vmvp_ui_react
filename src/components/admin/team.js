import React, { useState, useEffect } from "react";
import { Card, Drawer, Table, Tag, Space, Collapse } from "antd";
// import data from "../../assets/table/student";
import TeamForm from "./teamForm";
import VmvpApis from "../../services/ApiUrli";
import TeamView from "./getOne/Team";

const { Panel } = Collapse;
const Team = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [teamFormTitle, setTeamFormTitle] = useState("Add New Team Member");
  const [data, setData] = useState([]);
  const [selectedTeamMate, setSelectedTeamMate] = useState({});
  const onDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  useEffect(() => {
    VmvpApis.getAllTeamMates().then((res) => setData(res?.data.data));
  }, []);

  const columns = [
    {
      title: "Names",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (r) => (
        <Tag color={r ? "green" : "red"} key={r}>
          {" "}
          {r ? "Active" : "Inactive"}{" "}
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
              setIsDrawerVisible(true);
              setSelectedTeamMate(record);
            }}
          >
            View
          </a>
          {record?.status ? (
            <a style={{ color: "red" }}>Deactivate</a>
          ) : (
            <a style={{ color: "greeen" }}>Activate</a>
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
            <TeamForm />
          </Panel>
        </Collapse>

        <br></br>
        <Card hoverable title="List Of Team Members" bordered={true}>
          <Table columns={columns} dataSource={data} />
        </Card>
      </Card>
      <Drawer
        size="large"
        placement="right"
        onClose={onDrawerClose}
        visible={isDrawerVisible}
      >
        <TeamView singleTeam={selectedTeamMate} />
      </Drawer>
    </>
  );
};

export default Team;
