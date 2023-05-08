import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import LogoutButton from './Signup'

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/customerMain" className="nav-link">
            Main
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/addItem" className="nav-link">
            Add item
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/getInTouch" className="nav-link">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
