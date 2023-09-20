import React from 'react';
import '../style/header.css'; // Import your CSS file for styling
import { HashLink } from "react-router-hash-link"; 
import img1 from "../assets/washrzlogonew.png"
import Home from './Home';

function Header() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={img1}// Replace with the path to your logo image
          alt="Logo"
          className="navbar-logo" HashLink to={<Home/>}
        />
        <span className="navbar-title">Washrz.com</span>
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li className="navbar-link">
           <HashLink to ="/pickups">PickUps</HashLink>
          </li>
          <li className="navbar-link">
            <a href="/customerdetails">Customer Details</a>
          </li>
          <li className="navbar-link">
            <a href="/order">Orders</a>
          </li>
          <li className="navbar-link">
            <a href="/plant">Plant</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
