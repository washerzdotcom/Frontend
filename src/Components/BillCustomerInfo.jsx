import { Center } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AppContext } from '../utills/context'

const BillCustomerInfo = (currObj) => {
  const {currObj: {customerName, contactNo, address} } = useContext(AppContext);
  console.log("this is the ", {customerName, contactNo, address})
  return (
    <>
 {/* <h5 style={{paddingLeft: '20px', paddingTop:'10px', paddingBottom:"10px"}}>Customer Info:</h5> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems:"center",
            border: "2px solid black",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "25px",
            margin:"10px",
          }}
        >
          <div>
            <p>Name:</p>
            <p>Contact:</p>
            <p>Address:</p>
          </div>
          <div>
            <p>{customerName}</p>
            <p>{contactNo}</p>
            <p>{address}</p>
          </div>
        </div>
    </>
  )
}

export default BillCustomerInfo