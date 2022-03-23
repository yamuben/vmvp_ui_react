import React, { useState, useEffect } from "react";
import {
  Spin,
  Card,
  Drawer,
  Table,
  Tag,
  Space,
  Collapse,
  notification,
} from "antd";
import VmvpApis from "../../services/ApiUrli";
import Student from "./getOne/student";
import Sponsor from "./getOne/Sponsor";

const Request = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [selectedSponsor, setSelectedSponsor] = useState({});
  const [selectedRecord, setSelectedRecord] = useState({});

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const onDrawerClose = () => {
    setIsDrawerVisible(false);
  };
  const update = async (id, data) => {
    setLoading(true);
    const res = await VmvpApis.updateRequest(id, data);
    if (res?.status === 201) {
      setLoading(false);
      notification.success({ message: "Success done!" });
      window.location.reload();
    }
    notification.error({ message: "Error for updating!" });
  };
  useEffect(() => {
    VmvpApis.getAllRequests().then((res) => {
      console.log("*********", res);
      setData(res?.data.data);
    });
  }, []);

  const columns = [
    {
      title: "Sponsor Names",
      key: "sponsorName",
      render: (text, record) => <a>{record?.sponsor.name.split(" ")[0]}</a>,
    },
    {
      title: "Donation $",
      dataIndex: "donation",
      key: "donation",
      render: (text, record) => <a> {record?.sponsor.donation}</a>,
    },
    {
      title: "Child Names",
      dataIndex: "childName",
      key: "childName",
      render: (text, record) => <a>{record?.student.name}</a>,
    },
    {
      title: "Request Status",
      key: "isAvailable",
      dataIndex: "isAvailable",
      render: (text, record) => (
        <Tag
          color={
            record.status === "pending"
              ? "blue"
              : record.status === "accepted"
              ? "green"
              : "red"
          }
          key={"oop"}
        >
          {record.status}
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
              setSelectedSponsor(record.sponsor);
              setSelectedStudent(record.student);
              setSelectedRecord(record);
            }}
          >
            View
          </a>
          <a
            style={{ color: "red" }}
            onClick={async () => {
              await update(record._id, { status: "declined" });
            }}
          >
            Decline
          </a>
          <a
            style={{ color: "green" }}
            onClick={() => update(record._id, { status: "accepted" })}
          >
            Accept
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Card hoverable title="List Of Sponsor Requests" bordered={true}>
        <Spin tip="Loading..." spinning={loading}>
          <Table columns={columns} dataSource={data} />
        </Spin>
      </Card>

      <Drawer
        size="large"
        title=""
        placement="right"
        onClose={onDrawerClose}
        visible={isDrawerVisible}
      >
        <Student singleStudent={selectedStudent} />
        <Sponsor
          singleSponsor={selectedSponsor}
          status={selectedRecord?.status}
        />
      </Drawer>
    </>
  );
};

export default Request;
