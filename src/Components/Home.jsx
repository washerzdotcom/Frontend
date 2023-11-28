import React, { useEffect } from 'react'
import App from './Test';
import BillCustomerInfo from './BillCustomerInfo';
import BillPriceInfo from './BillPriceInfo';
import Login from './Login';
import BillCart from './BillCart';
import SearchBar from './SearchBar';
import UserListing from './UserListing';
import AddUser from './AddUser';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import axios from '../config.js';
import CustomLoader from './CustomLoader.jsx'

const Home = () => {
  const {auth, setAuth, isLoader} = useAuth();
  console.log("this is the auth--->> indide home", auth)

  return (
    <>
    <div style={{display:'flex', alignItems:'center',justifyContent:'center', height:"80vh"}}>
    <h1 color='black'>
      {auth.name ? `We are on Washrz.com!` : 'You are not Loged in :('}
      <br/>
      {!auth.name &&<Link to='/login'>Click to login</Link>}
    </h1>
   </div>
   </>
  )
}

export default Home;