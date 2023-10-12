import React from 'react'
import { Button, Table } from 'react-bootstrap'
import AddUser from "../Components/AddUser"
import { useState } from 'react'
import { HashLink } from "react-router-hash-link";

const UserListing = () => {

const [showAddUser,SetShowAddUser] =useState(false)

const ToggleAddUser =()=>
{
    SetShowAddUser(showAddUser);
}

  return (
    <>
    <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="p-3 mx-0">
          <div className="table-responsive">
          <h1
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "20px",
            fontSize: "24px", // Adjust font size for smaller screens
            textAlign: "center", // Center align for smaller screens
          }}
        >
          User Listing
        </h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Role</th>
                  <th>UserName</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                      <tr>
                        <td>{"Ayush Singh"}</td> 
                        <td>{"8174883345"}</td>
                        <td>{"Admin"}</td>
                        <td>{"Ayush@123"}</td>
                        <td><button
                            //   onClick={() => handledelete(user._id)}
                              className="btn btn-outline-danger d-block mx-auto" // Add these classes
                            //   disabled={isLoading ? true : false}
                              style={{ width: "100%" }} // Add this inline style
                            >
                              delete
                            </button></td>
                      </tr>
              </tbody>
            </Table>
          </div>
        </div>
        {/* {isLoading ? (
          <Loader loading={isLoading} />
        ) : (
          <div>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        )} */}
      </div>
    </div>
    <div style={{display:"flex",justifyContent:"center"}}>
    <HashLink to="/adduser"><Button style={{backgroundColor:"teal"}} onClick={ToggleAddUser}>Adduser</Button></HashLink>
    </div>
  </div>
   </>
  )
}

export default UserListing