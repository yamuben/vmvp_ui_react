import React from "react";
import { Statistic, Card, Row, Col } from "antd";

import { AreaChart, BarChart } from "reaviz";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const data = [
    { key: new Date("1/29/2019"), data: 30 },
    { key: new Date("3/12/2019"), data: 10 },
    { key: new Date("4/25/2019"), data: 26 },
    { key: new Date("1/1/2020"), data: 18 },
    { key: new Date("2/30/2020"), data: 16 },
    { key: new Date("3/1/2020"), data: 20 },
    { key: new Date("4/30/2020"), data: 15 },
    { key: new Date("5/1/2020"), data: 3 },
    { key: new Date("7/30/2020"), data: 50 },
    { key: new Date("12/1/2020"), data: 15 },
];
const Index = () => {
  return (
    <>
      <Card hoverable title="Summary Report" bordered={true}>
        <Row gutter={5}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Child Sponsored"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Pending"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#444000" }}
                prefix={<ArrowRightOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Not Sponsored"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card hoverable>
              <Statistic title="Active Children" value={112893} />
            </Card>
          </Col>
        </Row>
        <br/>
        <Card hoverable title="Requests Report">
          <AreaChart width={"100%"} height={250} data={data} />
        </Card>
        {/* <Card hoverable>
          <BarChart width={"100%"} height={250} data={data} />
        </Card> */}
      </Card>
    </>
  );
};

export default Index;
