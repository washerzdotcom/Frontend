import React from 'react'
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

const Home = () => {
  const {auth} = useAuth();
  console.log("i a minhnbjn")
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'center', height:"80vh"}}>
    <h1 color='black'>
      {auth.profile ? `We are Washrz.com!, And I am ${auth.role}` : 'You are not Loged in :('}
      <br/>
      {!auth.profile &&<Link to='/login'>Click to login</Link>}
    </h1>
   </div>
  )
}

export default Home;