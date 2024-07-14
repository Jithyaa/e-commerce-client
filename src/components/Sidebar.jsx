import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faUsers, faChartLine, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../scss/styles/sidebar.scss'

const Sidebar = () => {
    return (
        <div className="sidebar">
          <div className="sidebar__header">
            <h2>Admin Panel</h2>
          </div>
          <ul className="sidebar__nav">
            <li className="sidebar__nav-item">
                <a href="/admin/dashboard"></a>
              <FontAwesomeIcon icon={faHome} className="sidebar__nav-icon" />
              <span>Dashboard</span>
            </li>
            <li className="sidebar__nav-item">
                <a href="#"></a>
              <FontAwesomeIcon icon={faBox} className="sidebar__nav-icon" />
              <span>Products</span>
            </li>
            <li className="sidebar__nav-item">
              <FontAwesomeIcon icon={faChartLine} className="sidebar__nav-icon" />
              <span>Category</span>
            </li>
            <li className="sidebar__nav-item">
              <FontAwesomeIcon icon={faUsers} className="sidebar__nav-icon" />
              <span>Users</span>
            </li>
           
          </ul>
          <div className="sidebar__logout">
            <FontAwesomeIcon icon={faSignOutAlt} className="sidebar__logout-icon" />
            <span>Logout</span>
          </div>
        </div>
      );
    };

export default Sidebar
