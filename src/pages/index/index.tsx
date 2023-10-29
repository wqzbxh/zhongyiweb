import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Books from './Books/Books';
import Herbs from '../Herbs/Herbs';
import Prescription from '../Prescription/Prescription';

const { Header, Content, Footer } = Layout;

const Index: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const MenuList = [
    {
      key: '1', label: (
        <a href="/books" rel="noopener noreferrer"> 书籍 </a>
      ), title: "Book"
    },
    {
      key: '2', label: (
        <a href="/herbs" rel="noopener noreferrer"> 药材 </a>
      ),
    },
    {
      key: '3', label: (
        <a href="/prescription" rel="noopener noreferrer"> 药方查询 </a>
      ), title: "Book"
  
    },
  ]
  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          // items={MenuList}
          items={MenuList.map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: _.label,
            };
          })}
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>书籍</Breadcrumb.Item>
          <Breadcrumb.Item>药方</Breadcrumb.Item>
        </Breadcrumb> */}
        <div className="site-layout-content" style={{ background: colorBgContainer }}>
          <BrowserRouter>
            <Routes>
              <Route path="/books" element={<Books />} />
              <Route path="/herbs" element={<Herbs />} />
              <Route path="/prescription" element={<Prescription />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Content>
      <Footer  style={{
          textAlign: 'center' ,
        }} >中医  Design ©2023 Created by 海洋</Footer>
    </Layout>
  );
};

export default Index;