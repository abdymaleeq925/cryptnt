import React, { useState, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import logo from '../img/cryptocurrency.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState();

  const location = useLocation();

  const isActiveLocation = (path) => {
    return location.pathname === path;
  }

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    handleResize();
  }, [])

  useEffect(() => {
    if (screenSize < 800) { setActiveMenu(false) } else { setActiveMenu(true) }
  }, [screenSize])

  const items = [
    {
      label: <NavLink to='/'>Home</NavLink>,
      icon: <HomeOutlined />,
      key: '/',
      className: isActiveLocation('/') ? 'active-menu-item' : ''
    },
    {
      label: <NavLink to='/cryptocurrencies'>Cryptocurrencies</NavLink>,
      icon: <MoneyCollectOutlined />,
      key: 'cryptocurrencies',
      className: isActiveLocation('/cryptocurrencies') ? 'active-menu-item' : ''
    },
    {
      label: <NavLink to='/news' >News</NavLink>,
      icon: <BulbOutlined />,
      key: 'news',
      className: isActiveLocation('/news') ? 'active-menu-item' : ''
    }
]

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <Avatar src={logo} />
        <Typography.Title style={{ color: '#fff' }}>
          <Link to='/'>Cryptnt</Link>
        </Typography.Title>
      </div>
      {
        activeMenu &&
        <Menu theme='dark' items={items}>
        </Menu>
      }
      <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
        <MenuOutlined />
      </Button>
    </div>
  )
}

export default Navbar
