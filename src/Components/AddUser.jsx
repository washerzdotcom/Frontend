import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../style/formstyle.css';

const roles = ['Admin', 'Plant Manager', 'Rider'];

function App() {
  const { control, handleSubmit, register, formState: { errors }, reset } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Password and Confirm Password must match.");
      return;
    }
    console.log(data);
    // Handle form submission logic here

    // Reset the form after submission
    reset();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="container1">
      <h1 style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginBottom: "20px",
        fontSize: "24px", // Adjust font size for smaller screens
        textAlign: "center", // Center align for smaller screens
      }}>Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="form-group">
          <label>Full Name</label>
          <input {...register('fullName', { required: true })} className="form-control" />
          {errors.fullName && <span className="input-error">This field is required</span>}
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input {...register('mobileNumber', { required: true })} className="form-control" />
          {errors.mobileNumber && <span className="input-error">This field is required</span>}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input {...register('email', { required: true })} type="email" className="form-control" />
          {errors.email && <span className="input-error">This field is required</span>}
        </div>

        <div className="form-group">
          <label>Role</label>
          <select {...register('role', { required: true })} className="form-control">
            {roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
          {errors.role && <span className="input-error">This field is required</span>}
        </div>

        <div className="form-group">
          <label>Photo</label>
          <input type="file" {...register('photo', { required: true })} className="form-control-file" />
          {errors.photo && <span className="input-error">This field is required</span>}
        </div>

        <div className="form-group">
          <label>Aadhaar Card</label>
          <input type="file" {...register('aadhaarCard', { required: true })} className="form-control-file" />
          {errors.aadhaarCard && <span className="input-error">This field is required</span>}
        </div>

        <div className="form-group">
          <label>Driving Licence</label>
          <input type="file" {...register('drivingLicence', { required: true })} className="form-control-file" />
          {errors.drivingLicence && <span className="input-error">This field is required</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-group">
            <input
              type={passwordVisible ? 'text' : 'password'}
              {...register('password', { required: true })}
              className="form-control"
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {errors.password && <span className="input-error">This field is required</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-group">
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              {...register('confirmPassword', { required: true })}
              className="form-control"
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {errors.confirmPassword && <span className="input-error">This field is required</span>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
