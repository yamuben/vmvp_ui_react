import React, { useState, useEffect } from "react";
import { Card, Drawer, Table, Tag, Space, Collapse, Row, Col } from "antd";
// import data from "../../assets/table/student";
import StudentForm from "./studentForm";
import axios from "axios";
import VmvpApis from "../../services/ApiUrli";
import "./index.css";
import Student from "./getOne/student";
const { Panel } = Collapse;
const Students = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [update, setUpdate] = useState();
  const [singleStudent, setSingleStudent] = useState({});
  const [studentFormTitle, setStudentFormTitle] = useState("Add New Student");
  const [data, setData] = useState();
  const onDrawerClose = () => {
    setIsDrawerVisible(false);
  };
  useEffect(() => {
    VmvpApis.getAllStudents().then((students) => {
      setData(students?.data.data);
    });
  }, []);

  const columns = [
    {
      title: "Names",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (text)=><p>{text.slice(0,10)}</p>
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Is Available",
      key: "isAvailable",
      dataIndex: "isAvailable",
      render: (r) => (
        <Tag color={r ? "green" : "red"} key={r}>
          {" "}
          {r ? "Yes" : "No"}{" "}
        </Tag>
      ),
    },
    {
      title: "Is Active",
      key: "isActive",
      dataIndex: "isActive",
      render: (r) => (
        <Tag color={r ? "green" : "red"} key={r}>
          {" "}
          {r ? "Yes" : "No"}{" "}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle" style={{ cursor: "pointer" }}>
          <a
            onClick={() => {
              setIsDrawerVisible(true);
              setSingleStudent(record);
            }}
          >
            View
          </a>

          {record?.isAvailable ? (
            <a style={{ color: "green" }}>InActivate</a>
          ) : (
            <a style={{ color: "green" }}>Activate</a>
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
          <Panel header={studentFormTitle} key="1">
            <StudentForm />
          </Panel>
        </Collapse>

        <br></br>
        <Card hoverable title="List Of Student" bordered={true}>
          <Table columns={columns} dataSource={data} />
        </Card>
      </Card>
      <Drawer
        title=""
        placement="right"
        onClose={onDrawerClose}
        visible={isDrawerVisible}
        size="large"
      >
        <Student singleStudent={singleStudent} />
      </Drawer>
    </>
  );
};

export default Students;
