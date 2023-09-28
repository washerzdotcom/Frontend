import React, { useState } from 'react'

const BillPriceInfo = ({total}) => {
  const [value, setValue] = useState(0);
  return (
    <>
    <div style={{marginBottom:"50px"}}>
   {/* <h5 style={{paddingLeft: '20px', paddingTop:'10px', paddingBottom:"10px"}}>Billing Info:</h5> */}
   <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "2px solid black",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "25px",
            margin:"10px"
          }}
        >
          <div>
            <div style={{marginBottom:"20px"}}>Total Bill is:</div>
            <div style={{marginBottom:"20px"}}>Discount :</div>
            <div>Final Bill : </div>
          </div>
          <div>
            <div style={{marginBottom:"20px"}}> &#x20B9;{total}</div>
            <div style={{marginBottom:"20px", border:"2px solid"}}>
              <input
                type={"number"}
                // value={value}
                onChange={(e) => {
                  setValue(e.target.value*1)
                //   setdis(e.target.value);
                //   currObj.price = (
                //     total -
                //     total * (e.target.value / 100)
                //   ).toFixed(2);
                //   console.log("prceee", currObj.price);
                }}
              />
            </div>
            <div>&#x20B9;{(total - total * (value / 100)).toFixed(2)}</div>
          </div>
        </div>
        </div>
    </>
  )
}

export default BillPriceInfo