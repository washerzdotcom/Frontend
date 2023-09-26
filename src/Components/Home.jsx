import React from 'react'
import App from './Test';
import BillCustomerInfo from './BillCustomerInfo';
import BillPriceInfo from './BillPriceInfo';

const Home = () => {
  return (
    <>
    <div><BillCustomerInfo/></div>
    <div><BillPriceInfo/></div>
    </>
   
  )
}

export default Home;