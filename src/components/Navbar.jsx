import React, { useState, useRef, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, MenuOutlined } from '@ant-design/icons';

import logo from '../img/cryptocurrency.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState();

  const menuRef = useRef(null);

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
    if (screenSize <= 768) { setActiveMenu(false) } else { setActiveMenu(true) }
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
];

useEffect(() => {
  const handleClickOutside = (event) => {
    // Check clicks outside all dropdowns
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setActiveMenu(false);
    }
  };

  // Add event listener for clicks outside
  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <Avatar src={logo} />
        <Typography.Title style={{ color: '#fff' }}>
          <Link to='/'>Cryptnt</Link>
        </Typography.Title>
      </div>
      <div className="burger-menu-container" ref={menuRef}>
      {
        activeMenu &&
        <Menu theme='dark' items={items}>
        </Menu>
      }
      <Button aria-expanded={activeMenu} className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
        <MenuOutlined />
      </Button>
      </div>
    </div>
  )
}

export default Navbar
