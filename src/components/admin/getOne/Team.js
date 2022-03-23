import React, { useState } from "react";
import { Card, Drawer, Divider, Tag, Space, Collapse, Row, Col } from "antd";
import "../index.css";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    <label
      style={
        content === "No"
          ? { color: "red" }
          : content === "Yes"
          ? { color: "green" }
          : { color: "black" }
      }
    >
      {content}
    </label>
  </div>
);
const DescriptionLinkItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    <a href={content} target="_blank">
      {content}
    </a>
  </div>
);
const Team = ({ singleTeam }) => {
  return (
    <Card>
      <h1> Our Team Mate</h1>
      <Row>
        <Col span={12}>
          <img src={singleTeam?.picture} width="100%" alt="std" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Full Names" content={singleTeam?.name} />
          <DescriptionItem title="Title" content={singleTeam?.title} />
          <DescriptionItem title="Role" content={singleTeam?.role} />
          <DescriptionItem
            title="Description"
            content={singleTeam?.description}
          />
          <DescriptionItem
            title="Is Active?"
            content={singleTeam?.status ? "Yes" : "No"}
          />
          {/* <Divider /> */}
          {/* <h3>Social Media</h3> */}
          <DescriptionItem title="Social Medias" content="" />
          <DescriptionLinkItem
            title="Linkedin"
            content={singleTeam.socialMedia?.linkedin}
          />
          <DescriptionLinkItem
            title="Facebook"
            content={singleTeam.socialMedia?.facebook}
          />
          <DescriptionLinkItem
            title="Instagram"
            content={singleTeam.socialMedia?.instagram}
          />
          <DescriptionLinkItem
            title="Twitter"
            content={singleTeam.socialMedia?.twitter}
          />
          <Divider />
          {/* <DescriptionItem title="Problem One" content={singleTeam?.problemOne} /> */}
          <Divider />
          {/* <DescriptionItem title="Problem Two" content={singleTeam?.problemTwo} /> */}
        </Col>
      </Row>
    </Card>
  );
};

export default Team;
