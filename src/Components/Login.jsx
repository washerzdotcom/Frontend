import React, { useState } from 'react';
  import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  } from 'mdb-react-ui-kit';
  import img1 from "../assets/washrzlogohd-removebg-preview.png"
  import img2 from "../assets/loginTemplate.png"
  import "../style/login.css"
  
  function Login() {
    const [userType, setUserType] = useState('admin'); // Default to 'Admin'
  
    const handleUserTypeChange = (e) => {
      setUserType(e.target.value);
    };
  
    return (
      <MDBContainer  className=" my-5 d-flex justify-content-center align-items-center">
        <MDBCard style={{backgroundColor: 'white'}}className="max-height-card shadow p-3 ">
          <MDBRow className='g-0'>
            <MDBCol md='6'>
              <MDBCardImage src={img2} alt="login form" className='rounded-start w-100'/>
            </MDBCol>
  
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>
                <div className='d-flex flex-row mt-2'>
                  <img src={img1} alt="Logo" height={"70px"} width={"70px"}/>
                </div>
                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
  
                {/* Radio buttons for user type */}
                <h7 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Select User type</h7>
                <div className="mb-4 d-flex align-items-center">
                  <div className="form-check me-4 pb-3">
                    <input
                      type="radio"
                      id="admin"
                      name="userType"
                      value="admin"
                      checked={userType === 'admin'}
                      onChange={handleUserTypeChange}
                      className="form-check-input"
                    />
                    <label htmlFor="admin" className="form-check-label">Admin</label>
                  </div>
  
                  <div className="form-check me-4 pb-3">
                    <input
                      type="radio"
                      id="rider"
                      name="userType"
                      value="rider"
                      checked={userType === 'rider'}
                      onChange={handleUserTypeChange}
                      className="form-check-input"
                    />
                    <label htmlFor="rider" className="form-check-label">Rider</label>
                  </div>
  
                  <div className="form-check pb-3">
                    <input
                      type="radio"
                      id="plantManager"
                      name="userType"
                      value="plantManager"
                      checked={userType === 'plantManager'}
                      onChange={handleUserTypeChange}
                      className="form-check-input"
                    />
                    <label htmlFor="plantManager" className="form-check-label">Plant Manager</label>
                  </div>
                </div>
  
                <MDBInput wrapperClass='mb-4' placeholder='Email address' id='formControlLg' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4' placeholder='Password' id='formControlLg' type='password' size="lg"/>
  
                <MDBBtn style={{ backgroundColor: "#008080" }} className="mb-4 px-5" size='lg'>Login</MDBBtn>
                <a className="small text-muted" href="#!">Forgot password?</a>
  
                <div className='d-flex flex-row justify-content-start'>
                  <a href="#!" className="small text-muted me-1">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    );
  }
  
  export default Login;