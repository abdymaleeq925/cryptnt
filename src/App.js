import React from "react";
import { Routes, Route, Link} from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, CryptoDetail, Cryptocurrencies, News, Exchanges, Homepage, NewsDetail } from './components';

import './App.css';

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path='/' element = {<Homepage/>}/>
              <Route path='/exchanges' element = {<Exchanges/>}/>
              <Route path='/news' element = {<News/>}/>
              <Route path='/cryptocurrencies' element = {<Cryptocurrencies/>}/>
              <Route path='/crypto/:coinId' element = {<CryptoDetail/>}/>
              <Route path='/newsDetail/:articleId' element = {<NewsDetail/>}/>
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{color: '#fff', textAlign: 'center'}}>
            MalikCrypto Source <br/>
            All rights reserved
          </Typography.Title>
          <Space style={{color: '#fff', textAlign: 'center'}}>
            <Link to='/'>Home</Link>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>    
    </div>
  );
}

export default App;
