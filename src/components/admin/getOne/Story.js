import React, { useState } from "react";
import { Card, Drawer, Divider, Tag, Space, Collapse, Row, Col } from "antd";
import "../index.css";


const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    <label style={content==="No"? {color:"red"}:content==="Yes"?{color:"green"}:{color:"black"}}>{content}</label>
  </div>
);
const Student = ({ singleStory }) => {
  return (
    <Card>
        {/* <h1> Child</h1> */}
      <Row>
        <Col span={12}>
          <img src={singleStory?.picture} width="100%" alt="std" />
        </Col>
        <Col span={12}>
          {singleStory?.name ? <DescriptionItem title="Full Names" content={singleStory?.name} />:""}
          <hr style={{opacity:"0.3"}}/>
          <DescriptionItem title="Story" content={singleStory?.description} />
        </Col>
      </Row>
    </Card>
  );
};

export default Student;
