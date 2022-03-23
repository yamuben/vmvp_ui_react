import React, { useState } from "react";
import { Card, Drawer, Divider, Tag, Space, Collapse, Row, Col } from "antd";
import "../index.css";


const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    <label style={content==="No"? {color:"red"}:content==="Yes"?{color:"green"}:{color:"black"}}>{content}</label>
  </div>
);
const Sponsor = ({ singleSponsor ,status}) => {
  return (
    <Card>
        <h1> Sponsor</h1>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Full Names" content={singleSponsor?.name} />
          <DescriptionItem title="Email" content={singleSponsor?.email} />
          <DescriptionItem title="Phone" content={singleSponsor?.phoneNumber} />
          <DescriptionItem title="Country" content={singleSponsor?.country} />
          <DescriptionItem title="Is Active?" content={singleSponsor?.isAvailable? "No":"Yes"} />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Donation" content={singleSponsor?.donation + " $"} />
         {!status? "": <DescriptionItem title="Request Status" content={status} />}
          {/* <DescriptionItem title="Is Active?" content={singleSponsor?.isAvailable? "No":"Yes"} /> */}
        </Col>
      </Row>
    </Card>
  );
};

export default Sponsor;
