import React from 'react'
import App from './Test';
import BillCustomerInfo from './BillCustomerInfo';
import BillPriceInfo from './BillPriceInfo';
import Login from './Login';
import BillCart from './BillCart';
import Profile from './Profile';
import SearchBar from './SearchBar';

const Home = () => {
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'center', height:"80vh"}}>
    <h1>
    We are Washrz.com!
     {/* <div></div>
     <div></div> */}
     {/* <Login/> */}
     {/* <BillCustomerInfo/> */}
     {/* <BillCart/> */}
     {/* <BillPriceInfo/> */}
    {/* // </h1> */}
   {/* <SearchBar/> */}
   </h1>
   </div>
  )
}

export default Home;