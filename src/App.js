import React from "react";
import { Routes, Route} from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { Navbar, CryptoDetail, Cryptocurrencies, News, Homepage, NewsDetail } from './components';

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
              <Route path='/news' element = {<News/>}/>
              <Route path='/cryptocurrencies' element = {<Cryptocurrencies/>}/>
              <Route path='/crypto/:coinId' element = {<CryptoDetail/>}/>
              <Route path='/newsDetail/:articleId' element = {<NewsDetail/>}/>
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{color: '#fff', textAlign: 'center'}}>
            Cryptonite - Crypto Source <br/>
            All rights reserved
          </Typography.Title>
        </div>
      </div>    
    </div>
  );
}

export default App;
