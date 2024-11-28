import React from "react";
import "../style/header.css"; // Import your CSS file for styling
import img1 from "../assets/washrzlogonew.png";
import Home from "./Home";
import Profile from "./Profile";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const ALLOWED_ROLES = {
  ADMIN: "admin",
  RIDER: "rider",
  PLANT_MANAGER: "plant-manager",
};

function Header() {
  const { auth } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const userRole = auth?.role;
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={img1}
          alt="Logo"
          className="navbar-logo"
          HashLink
          to={<Home />}
          onClick={() => navigate("/")}
        />
        <span className="navbar-title" onClick={() => navigate("/")}>
          Washrz.com
        </span>
      </div>
      <div style={{ display: "flex" }} className="navbar-right">
        <ul className="navbar-links">
          {userRole === ALLOWED_ROLES.ADMIN && (
            <>
              {/* <li className="navbar-link">
                <Link to="/currentloc">Location</Link>
              </li> */}
              <li className="navbar-link">
                <Link to="/pickups">PickUps</Link>
              </li>
              <li className="navbar-link">
                <Link to="/customerdetails">Customers</Link>
              </li>
              <li className="navbar-link">
                <Link to="/order">Orders</Link>
              </li>
              <li className="navbar-link">
                <Link to="/plant">Plant</Link>
              </li>
            </>
          )}
          {userRole === ALLOWED_ROLES.RIDER && (
            <>
              <li className="navbar-link">
                <Link to="/rider/pickups">PickUps</Link>
              </li>
              <li className="navbar-link">
                <Link to="/rider/deliveries">Deliveries</Link>
              </li>
            </>
          )}
          {userRole === ALLOWED_ROLES.PLANT_MANAGER && (
            <>
              <li className="navbar-link">
                <Link to="/plantmanager/pickupAllocation">
                  Pickup Allocation
                </Link>
              </li>
              <li className="navbar-link">
                <Link to="/plantmanager/order">Orders</Link>
              </li>
            </>
          )}
          <li className="navbar-link">
            {auth.name ? <Profile /> : <Link to="/login">Login</Link>}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
