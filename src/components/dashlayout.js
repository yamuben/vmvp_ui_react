import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu ,Affix,Card} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import Dashboard from "./admin/dashboard";
import Team from "./admin/team";
import Student from "./admin/student";
import Request from "./admin/requests";
import Sponsor from "./admin/sponsor";
import Story from "./admin/story";
import { useNavigate } from "react-router-dom";
import Home from "../views/home";

const { Header, Sider, Content } = Layout;
const Dashlayout = () => {
    const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [indexComponent, setIndexComponent] = useState(0);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const logout=()=>{
      return navigate("/");
  }
  const menuData = [
    {
      title: "Dashboard",
      icon: <UserOutlined />,
      component:Dashboard()
    },
    {
      title: "Manage Requests",
      icon: <UserOutlined />,
      component:Request()
    },
    {
      title: "Manage Students",
      icon: <UserOutlined />,
      component: <Student />,
    },
    {
      title: "Manage Sponsors",
      icon: <UserOutlined />,
      component:Sponsor()
    },
    {
      title: "Manage Teams",
      icon: <UserOutlined />,
      component: Team(),
    },
    {
      title: "Manage Stories",
      icon: <UserOutlined />,
      component: Story(),
    },
    {
      title: "Logout",
      icon: <UserOutlined />
    },
  ];
  return (
    <Layout>
        <Affix offsetTop={1}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100vh" }}
      >
        <div className="logo" >
            {/* <Card style={{background:"darkBleu"}}>  */}
                <h1>Admin Portal</h1>
            {/* </Card> */}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${indexComponent}`]}>
          {menuData.map((_menu, index) => (
            <Menu.Item
              key={index}
              icon={_menu.icon}
              onClick={() => index===menuData.length-1 ? logout() :setIndexComponent(index)}
            >
              {_menu.title}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      </Affix>

      <Layout className="site-layout">
        <Affix offsetTop={1}>
      
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        </Affix>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
        <div> {menuData[indexComponent].component}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashlayout;
