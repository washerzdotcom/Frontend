import React from 'react'
import App from './Test';
import BillCustomerInfo from './BillCustomerInfo';
import BillPriceInfo from './BillPriceInfo';
import Login from './Login';
import BillCart from './BillCart';

const Home = () => {
  return (
    <>
    {/* <div></div>
    <div></div> */}
    {/* <Login/> */}
    <BillCustomerInfo/>
    <BillCart/>
    <BillPriceInfo/>
    </>
   
  )
}

export default Home;