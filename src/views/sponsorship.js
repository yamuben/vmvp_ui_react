import React, { useState, useEffect } from "react";
import { Card, Divider, Skeleton, Drawer, Button } from "antd";
import 'antd/dist/antd.css';
import {LeftOutlined} from "@ant-design/icons"
import VmvpApis from "../services/ApiUrli";
import SingleChild from "../components/admin/getOne/student";
import SponsorForm from "../components/admin/sponsorForm";

const { Meta } = Card;
const gridStyle = {
  width: "20%",
  textAlign: "center",
};
const SponsorshipView = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isDownDrawerVisible, setIsDownDrawerVisible] = useState(false);
  const [allChildren, setAllChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [child, setChild] = useState({});
  const onDrawerClose = () => {
    setIsDrawerVisible(false);
    setIsDownDrawerVisible(false);
  };
  useEffect(() => {
    VmvpApis.getAllStudents().then((res) => {
      setAllChildren(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
    <Card>
     <a href="https://www.vmvp.org"> <LeftOutlined /> Get back</a>
    </Card>
      <Card style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>
          SPONSOR A VULNERABLE FATHERLESS KID
        </h1>
        <Divider />
        {loading ? (
          <Skeleton active />
        ) : (
          allChildren.map((_child) => _child?.isActive ? (
            <Card.Grid style={gridStyle} hoverable={false}>
              <Card
                hoverable
                style={{}}
                cover={
                  loading ? (
                    <Skeleton.Image />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                        height: "300px",
                        overflow: "hidden",
                      }}
                    >
                      {" "}
                      <img alt="child" src={_child?.picture}  style={{width:"100%"}}/>
                    </div>
                  )
                }
                onClick={() => {
                  setChild(_child);
                  setIsDrawerVisible(true);
                }}
              >
                <Meta
                style={{padding:"20px"}}
                  title={_child?.name}
                  description={`Born in ${_child?.dateOfBirth.slice(0, 10)}`}
                />
                <p style={{fontWeight:"lighter",color:`${_child?.isAvailable?"green":"black"}`}}>{_child?.isAvailable ? "Would you be my sponsor?" :"I got sponsor from here!"}
                </p>
              </Card>
            </Card.Grid>
          ):(<></>))
        )}
      </Card>
      <Drawer
        size="large"
        title="Apply To Support This Child"
        placement="right"
        onClose={onDrawerClose}
        visible={isDrawerVisible}
      >
        <SingleChild singleStudent={child} />
       {child?.isAvailable? ( <Button type="primary" style={{background:"green"}} onClick={() => setIsDownDrawerVisible(true)}>
         Sponsor Me!
        </Button>):(<></>) }
      </Drawer>
      <Drawer
        title="Fill The Form To Support This Child"
        placement="bottom"
        onClose={()=>setIsDownDrawerVisible(false)}
        visible={isDownDrawerVisible}
      >
        <SponsorForm child={child} />
      </Drawer>
    </>

  );
};

export default SponsorshipView;
