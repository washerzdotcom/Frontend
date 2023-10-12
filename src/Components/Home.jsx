import React from 'react'
import App from './Test';
import BillCustomerInfo from './BillCustomerInfo';
import BillPriceInfo from './BillPriceInfo';
import Login from './Login';
import BillCart from './BillCart';
import Profile from './Profile';
import SearchBar from './SearchBar';
import UserListing from './UserListing';
import AddUser from './AddUser';

const Home = () => {
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'center', height:"80vh"}}>
    {/* <h1>
    We are Washrz.com!
    </h1> */}
     {/* <div></div>
     <div></div> */}
     <Login/>
     {/* <BillCustomerInfo/> */}
     {/* <BillCart/> */}
     {/* <BillPriceInfo/> */}
    {/* // </h1> */}
   {/* <SearchBar/> */}
   {/* <UserListing/> */}
   {/* <AddUser/> */}

   </div>
  )
}

export default Home;