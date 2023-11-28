import React from 'react';
import '../style/header.css'; // Import your CSS file for styling
import img1 from "../assets/washrzlogonew.png"
import Home from './Home';
import Profile from './Profile';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const { auth } = useAuth();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={img1}// Replace with the path to your logo image
          alt="Logo"
          className="navbar-logo" HashLink to={<Home/>}
          onClick={()=> navigate('/')}
        />
        <span className="navbar-title"  onClick={()=> navigate('/')}>Washrz.com</span>
      </div>
      <div style={{display: 'flex'}}className="navbar-right">
        <ul className="navbar-links">
          <li className="navbar-link">
           {/* <HashLink to ="/pickups">PickUps</HashLink> */}
           <Link to='/pickups'>PickUps</Link>
          </li>
          <li className="navbar-link">
            {/* <a href="/customerdetails">Customers</a> */}
            <Link to='/customerdetails'>Customers</Link>
          </li>
          <li className="navbar-link">
            {/* <a href="/order">Orders</a> */}
            <Link to='/order'>Orders</Link>
          </li>
          <li className="navbar-link">
            {/* <a href="/plant">Plant</a> */}
            <Link to='/plant'>Plant</Link>
          </li>
          <li className="navbar-link">
          {auth.name?  <Profile/> : <Link to='/login'>Login</Link>}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
