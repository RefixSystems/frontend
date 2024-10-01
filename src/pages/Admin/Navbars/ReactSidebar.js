import React, { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { getRole } from '../../../Constants/Global';
import { useGetSidebarAccessQuery } from '../../../redux/api/DashboardApi';
import { useTheme } from '../../../Contexts/ThemeContext';
import { Badge } from 'react-bootstrap';
import { getPhoneNumber } from '../../../Constants/PhoneNumberGlobal';
import axios from 'axios';

const filterSidebarItems = (items, apiData) => {
  return items
    .map((item) => {
      const hasRead = apiData.some(
        (data) => data.moduleName === item.module && data.read === true
      );
      const count =
        apiData.find((data) => data.moduleName === item.module)?.count || 0; // Check for count
      if (item.children && item.children.length > 0) {
        const filteredChildren = filterSidebarItems(item.children, apiData);
        return hasRead || filteredChildren.length > 0
          ? { ...item, children: filteredChildren, count } // Add count to the item
          : null;
      }
      return hasRead ? { ...item, count } : null; // Add count to the item
    })
    .filter((item) => item !== null);
};

const ReactSidebar = ({ sidebarItems, onClick }) => {
  const location = useLocation();
  const { color } = useTheme();
  const [filteredSidebarItems, setFilteredSidebarItems] = useState([]);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [type, setType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const role = getRole();
  const phoneNumber = getPhoneNumber();

  const { data: apiData } = useGetSidebarAccessQuery({
    role: role,
    phoneNumber: phoneNumber,
  });
  console.log(apiData);
  useEffect(() => {
    if (apiData && apiData.data) {
      const filteredItems = filterSidebarItems(sidebarItems, apiData.data);
      setFilteredSidebarItems(filteredItems);
    }
  }, [type, apiData, sidebarItems]);

  const handleSubMenuClick = (id) => {
    setActiveSubMenu((prev) => (prev === id ? null : id));
  };
  const handleMenuClick = (parent_id, id) => {
    setActiveSubMenu((prev) => (prev === parent_id ? parent_id : id));
  };

  const resetCounts = async (item) => {
    console.log(type);
    setType(item);
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://the-laptop-doctor.onrender.com/admin/resetCounts',
        {
          phoneNumber: phoneNumber,
          type: type,
        }
      );
      console.log(response);

      const getResponse = await axios.get(
        `https://the-laptop-doctor.onrender.com/admin/verifyAccess/${role}/${phoneNumber}`
      );
      console.log(getResponse.data.data);
      const filteredItems = filterSidebarItems(
        sidebarItems,
        getResponse.data.data
      );
      setFilteredSidebarItems(filteredItems);
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false); 
    }
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      const isActive = location.pathname === item.url;
      const count = item.count;
      if (item.children && item.children.length > 0) {
        const isSubMenuActive = activeSubMenu === item.id;
        return (
          <SubMenu
            className="fs-15 text-bolder"
            active={isActive || isSubMenuActive}
            rootStyles={{
              backgroundColor: isActive ? 'white' : '#e9e8e8 ',
              color: 'black',
              paddingRight: '10px',
            }}
            open={isSubMenuActive}
            key={item.id}
            title={item.label}
            label={
              <>
                {item.label}
                {count > 0 && (
                  <Badge bg="danger" className="ml-2 mx-3">
                    {count}
                  </Badge>
                )}
                    {isLoading && <span></span>}
              </>
            }
            icon={React.cloneElement(item.icon, { color: color })}
            onClick={() => {
              handleSubMenuClick(item.id);
              resetCounts(item.module);
            }}
          >
            {isSubMenuActive && renderMenuItems(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Link
            key={item.id}
            className="textDecoration-none color-white"
            to={item.url}
            style={{ textDecoration: 'none' }}
            onClick={() => resetCounts(item.module)}
          >
            <MenuItem
              onClick={() => handleMenuClick(item.parent_id, item.id)}
              className="fs-15 text-bolder"
              active={isActive}
              rootStyles={{
                backgroundColor: isActive ? '#c8f7fa' : '#e9e8e8 ',
                color: isActive ? 'black' : 'black',
                width: '260px',
              }}
              icon={React.cloneElement(item.icon, { color: color })}
            >
              <>
                {item.label}
                {count > 0 && (
                  <Badge bg="danger" className="ml-2 mx-3">
                    {count}
                  </Badge>
                )}
                    {isLoading && <span></span>}
              </>
            </MenuItem>
          </Link>
        );
      }
    });
  };

  return (
    <div className="sidebar-container">
      <Sidebar
        backgroundColor="#e9e8e8 "
        rootStyles={{
          backgroundColor: '#313947',
          color: 'white',
          fontWeight: 'bolder',
          width: 'auto',
          height: '100vh',
        }}
      >
        <div className="menu-container">
          <Menu iconShape="circle">
            {renderMenuItems(filteredSidebarItems)}
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
};

export default ReactSidebar;
