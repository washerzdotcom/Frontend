import { Center } from '@chakra-ui/react'
import React from 'react'

const BillCustomerInfo = (currObj) => {
  const { contactNo, customerName, address } = currObj;

  return (
    <>
 <h5 style={{paddingLeft: '20px', paddingTop:'10px', paddingBottom:"10px"}}>Customer Info:</h5>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems:"center",
            border: "2px solid black",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "25px",
            margin:"0px 20px",
          }}
        >
          <div>
            <p>Name:</p>
            <p>Contact:</p>
            <p>Address:</p>
          </div>
          <div>
            <p>{"Ayush Singh"}</p>
            <p>{"8174883345"}</p>
            <p>{"Sector 135 Noida"}</p>
          </div>
        </div>
    </>
  )
}

export default BillCustomerInfo