import React, { useState, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import logo from '../img/cryptocurrency.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    handleResize();
  }, [])

  useEffect(() => {
    if (screenSize < 800 ) {setActiveMenu(false)} else {setActiveMenu(true)}
  }, [screenSize])
  
  return (
    <div className="navbar-container">
      <div className="logo-container">
        <Avatar src={logo}/>
        <Typography.Title style={{color: '#fff'}}>
          <Link to='/'>Malik</Link>
        </Typography.Title>
      </div>
      {
        activeMenu &&
          <Menu theme='dark'>
            <Menu.Item icon={<HomeOutlined/>}>
              <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined/>}>
              <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined/>}>
              <Link to='/exchanges'>Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined/>}>
              <Link to='/news'>News</Link>
            </Menu.Item>  
          </Menu>
      }
        <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
          <MenuOutlined/>
        </Button>
    </div>
  )
}

export default Navbar
