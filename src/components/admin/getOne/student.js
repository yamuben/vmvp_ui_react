import React, { useState } from "react";
import { Card, Drawer, Divider, Tag, Space, Collapse, Row, Col } from "antd";
import "../index.css";


const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    <label style={content==="No"? {color:"red"}:content==="Yes"?{color:"green"}:{color:"black"}}>{content}</label>
  </div>
);
const Student = ({ singleStudent }) => {
  return (
    <Card>
        {/* <h1> Child</h1> */}
      <Row>
        <Col span={12}>
          <img src={singleStudent?.picture} width="100%" alt="std" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Full Names" content={singleStudent?.name} />
          <DescriptionItem title="Gender" content={singleStudent?.gender} />
          <DescriptionItem title="Date Of Birth" content={singleStudent?.dateOfBirth.slice(0,10)} />
          <DescriptionItem title="Has Sponsor" content={singleStudent?.isAvailable? "No":"Yes"} />
          {/* <Divider /> */}
          <hr style={{opacity:"0.3"}}/>
          <DescriptionItem title="Dreams" content={singleStudent?.dream} />
          <hr style={{opacity:"0.3"}}/>
          <DescriptionItem title="Problem " content={singleStudent?.problemOne} />
          <hr style={{opacity:"0.3"}}/>
          <DescriptionItem title="Solution" content={singleStudent?.problemTwo} />
        </Col>
      </Row>
    </Card>
  );
};

export default Student;
