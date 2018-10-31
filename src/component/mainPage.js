import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React from 'react'
import './mainPage.css'
import {Button} from 'antd'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class SiderDemo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            collapsed: false
        }
        this.reloadContent = this.reloadContent.bind(this);

    }

    onCollapse = (collapsed) => {
      console.log(collapsed);
      this.setState({ collapsed });
    }

    reloadContent(item, key, path){
      // this.props.history.push(url);
      console.log(item.item.props.url);
      console.log(this.props.history)
      this.props.history.push(item.item.props.url);
    }
    

  render() {

    const ContentPage = this.props.contentPage;
    const reloadContent = this.reloadContent;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" 
                defaultSelectedKeys={['6']} 
                defaultOpenKeys = {['sub1']} 
                mode="inline"
                onClick = {reloadContent.bind(this)}>
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3" url='./Story' >story</Menu.Item>
              <Menu.Item key="4" >Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }} hasSider='true'>
              {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
        
      </Layout>
    );
  }
}

export default SiderDemo;