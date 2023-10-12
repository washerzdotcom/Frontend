import React from 'react'
import { PopupMenu } from "react-simple-widgets";
import "../style/profile.scss"
import "../style/responsive.css"
import { HashLink } from "react-router-hash-link";
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { auth: {profile: {name, email, role}}} = useAuth();
  return (
    <>
     <div id="app">
        <PopupMenu>
          <div style={{fontWeight:"bold"}}>
            Menu
          </div>
            <div  className="card-body px-4 py-4 my-4 mx-0 bodytag">
              <div id="circle-avatar" className="text-center mx-auto mb-4">
                <span>K</span>
              </div>

              <h5 className="text-center mb-0" style={{color:"white"}}>{name}</h5>
              <p className="text-center mb-2" style={{color:"white"}}>{email}</p>

              <hr />

              <p
                className="mb-0"
                style={{ color: "#ffff", fontWeight: "bold", fontSize: 12 }}
              >
                ROLES
              </p>
              <p style={{ fontSize: 12, color: "#ffff"}}>
                {[role].join(
                  ", "
                )}
              </p>

              <hr className="mb-0" style={{ margin: "0 -24px 0" }} />

              <div
                className="list-group list-group-flush"
                style={{ margin: "0px 0px"}}
              >
                <HashLink to='/userlisting' className="list-group-item list-group-item-action px-4" style={{backgroundColor:"teal",color:"#ffff", width:"190px"}}>
                  <small>User List</small>
                </HashLink>
                {/* <button className="list-group-item list-group-item-action px-4"style={{backgroundColor:"teal",color:"#ffff"}}>
                  <small>Pending Requests</small>
                </button>
                <button className="list-group-item list-group-item-action px-4"style={{backgroundColor:"teal",color:"#ffff"}}>
                  <small>Other Requests</small>
                </button> */}
                <HashLink to='/aboutuser' className="list-group-item list-group-item-action px-4" style={{backgroundColor:"teal",color:"#ffff", width:"190px"}}>
                  <small>Profile</small>
                </HashLink>
              </div>

              <hr style={{ margin: "0 -24px 24px" }} />

              <div className="d-grid">
                <button className="btn btn-secondary">
                  <small>Logout</small>
                </button>
              </div>
            </div>
        </PopupMenu>
      </div>
    </>
  )
}

export default Profile