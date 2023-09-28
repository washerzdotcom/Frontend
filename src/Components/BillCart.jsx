import React, { useState } from "react";
import Item from "./Item";
import ItemSlider from "./itemSlider";

function BillCart() {
  const [items, setItems] = useState([
    {
      heading: "Wash & Fold(Wearable)",
      subHeading: "₹80/kg",
      viewPrice: 80,
      quantity: 0,
      price: 0,
    },
    {
      heading: "Wash & Fold(Non-Wearable)",
      subHeading: "₹100/kg",
      viewPrice: 100,
      quantity: 0,
      price: 0,
    },
    {
      heading: "Wash & Iron(Wearable)",
      subHeading: "₹100/kg",
      viewPrice: 100,
      quantity: 0,
      price: 0,
    },
    {
      heading: "Wash & Iron(Non-Wearable)",
      subHeading: "₹120/kg",
      viewPrice: 120,
      quantity: 0,
      price: 0,
    },
  ]);

  const handleQuantity = (type, i) => {
    const changedArr = [...items];
    if (changedArr[i].quantity === 0 && type === "-") return;
    if (type === "-") {
      changedArr[i].quantity = changedArr[i].quantity - 1;
    } else if ("+") {
      changedArr[i].quantity = changedArr[i].quantity + 1;
    }
    setItems([...changedArr]);
  };

  const inputChange = (i, value) => {
    console.log("helooo--", value);
    const changedArr = [...items];
    if (!value || value > 0) {
      console.log("helooo1--", value);
      changedArr[i].quantity = !value ? "" : value * 1;
      setItems([...changedArr]);
    }
  };
  return (
    <div
    style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
    <div
      style={{
        width: "80vw",
        display: "flex",
        flexDirection: "column",
        border: "2px solid black",
        borderRadius: "5px",margin:"20px 20px"
      }}
    >
      <div>
        {" "}
        <h5 style={{paddingLeft: '20px', paddingTop:'10px', paddingBottom:"10px"}}>Added Items:</h5>
        <Item
          items={items}
          handleQuantity={handleQuantity}
          inputChange={inputChange}
        />
      </div>
      <div>
        <h5 style={{paddingLeft: '20px', paddingTop:'10px', paddingBottom:"10px"}}>Dry Clean:</h5>
        <ItemSlider />
      </div>
      <div>
        {" "}
        <h5 style={{paddingLeft: '20px', paddingTop:'10px', paddingBottom:"10px"}}>Shoe Spa:</h5>
        <ItemSlider />
      </div>
    </div>
    </div>
  );
}

export default BillCart;
