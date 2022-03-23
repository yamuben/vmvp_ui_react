import React, { useState, useEffect } from "react";
import { Card, Drawer, Table, Tag, Space, Collapse, notification } from "antd";
// import data from "../../assets/table/student";
import TeamForm from "./teamForm";
import VmvpApis from "../../services/ApiUrli";
import TeamView from "./getOne/Team";

const { Panel } = Collapse;
const Team = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [teamFormTitle, setTeamFormTitle] = useState("Add New Team Member");
  const [updateDrawerVisible, setUpdateDrawerVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedTeamMate, setSelectedTeamMate] = useState({});
  const onDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  const updateActivation = async (id, data) => {
    const res = await VmvpApis.updateTeamMate(id, data);

    if (res.status === 200) {
      window.location.reload();
    } else {
      notification.error({ message: "Failed to update" });
    }
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
      title: "Role",
      dataIndex: "role",
      key: "role",
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
            <a style={{ color: "red" }} onClick={() =>updateActivation(record?._id,{status:false})}>Deactivate</a>
          ) : (
            <a style={{ color: "green" }} onClick={() =>updateActivation(record?._id,{status:true})} >Activate</a>
          )}
          <a
            onClick={() => {
              setSelectedTeamMate(record);
              setUpdateDrawerVisible(true);
            }}
          >
            Edit
          </a>
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
      <Drawer
        title="Update Student"
        placement="top"
        onClose={() => setUpdateDrawerVisible(false)}
        visible={updateDrawerVisible}
        size="large"
      >
        <TeamForm teamMate={selectedTeamMate} update={true} />
      </Drawer>
    </>
  );
};

export default Team;
