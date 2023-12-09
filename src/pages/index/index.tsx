import React, { useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Books from './Books/Books';
import Herbs from '../Herbs/Herbs';
import Prescription from '../Prescription/Prescription';
import DiseaseInquiry from '../Prescription/DiseaseInquiry';
import FooterComponents from '../footer';
import { handleSearchValue } from '../features/pagekey/pagekeySlice';
import { RootState } from '../store';

const { Header, Content, Footer } = Layout;

export default function  Index(){
  const [page_key,setPage_key] = React.useState<string>("1");
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
  
    }, {
      key: '4', label: (
        <a href="/get_prescription_by_symptoms" rel="noopener noreferrer"> 病症查询 </a>
      ), title: "Book"
  
    },
  ]


  function menuClickFunction(event:any){
    localStorage.setItem('current_key',event.key );
  }

  useEffect(()=>{
  if(localStorage.getItem('current_key')) {
    setPage_key(localStorage.getItem('current_key') as string)
  }else{
    setPage_key('1')
  }
  },[page_key])
  // 根据当前页面的 URI 确定要选中的菜单项
  // const selectedKey = MenuList.find(item => location.pathname.startsWith(item.label.props.href))?.key;
  // console.log('selectedKey', selectedKey);
  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          key={page_key}
          defaultSelectedKeys={[page_key]}
          onClick={(event)=>menuClickFunction(event)}
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
        <div className="site-layout-content" style={{ background: colorBgContainer }}>
          <BrowserRouter>
            <Routes>
              <Route path="/books" element={<Books />} />
              <Route path="/herbs" element={<Herbs />} />
              <Route path="/prescription" element={<Prescription />} />
              <Route path="/get_prescription_by_symptoms" element={<DiseaseInquiry />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Content>

      <FooterComponents />
    </Layout>
  );
};
