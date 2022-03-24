import React, { useState, useEffect } from "react";
import { Card, Drawer, Table, Tag, Space, Collapse } from "antd";
// import data from "../../assets/table/student";
import SponsorForm from "./sponsorForm";
import VmvpApis from "../../services/ApiUrli";
import SponsorView from "./getOne/Sponsor"

const { Panel } = Collapse;
const Sponsor = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [data, setData] = useState([]);
  const [SponsorFormTitle, setSponsorFormTitle] = useState("Add New Sponsor");
  const [selectedSponsor,setSelectedSponsor] = useState({})

  const onDrawerClose = () => {
    setIsDrawerVisible(false);
  };
  useEffect(() => {
    VmvpApis.getAllSponsors().then((res) => setData(res?.data.data));
  }, []);
  const columns = [
    {
      title: "Names",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Donation",
      dataIndex: "donation",
      key: "donation",
    },
    {
      title: "Is Active? ",
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
        <Space size="middle">
          <a onClick={() => {setIsDrawerVisible(true); setSelectedSponsor(record)}}>View</a>
          {record.isActive ? <a style={{color:"red"}}>Deactivate</a>: <a style={{color:"green"}}>Activate</a> }
          <a>Edit</a>
        </Space>
      ),
    },
  ];
  return (
    <>
      {" "}
      <Card>
        <Collapse collapsible="disabled">
          <Panel header={SponsorFormTitle} key="1">
            <SponsorForm />
          </Panel>
        </Collapse>

        <br></br>
        <Card hoverable title="List Of Sponsor" bordered={true}>
          <Table columns={columns} dataSource={data} />
        </Card>
      </Card>
      <Drawer
      size="large"
        placement="right"
        onClose={onDrawerClose}
        visible={isDrawerVisible}
      >
        <SponsorView singleSponsor={selectedSponsor}/>
      </Drawer>
    </>
  );
};

export default Sponsor;
