import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ConfigProvider } from 'antd';
import Index from './pages/index';

function App() {
  return (
    <ConfigProvider theme={{ token: { } }}>
     <Index />
    </ConfigProvider>
  );
}

export default App;
