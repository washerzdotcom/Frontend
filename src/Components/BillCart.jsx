import React, { useState } from "react";
import Item from "./Item";
import ItemSlider from "./itemSlider";
import BillCustomerInfo from "./BillCustomerInfo";
import BillPriceInfo from "./BillPriceInfo";

function BillCart() {
  const [items, setItems] = useState([]);
  const [laundry, setLaundry] = useState({
    label: "Laundry",
    children: [
      {
        label: "Wash & Fold(Wearable)",
        viewPrice: "80/kg",
        Price: 80,
        newQtyPrice: 80,
      },
      {
        label: "Wash & Fold(Non-Wearable)",
        viewPrice: "100/kg",
        Price: 100,
        newQtyPrice: 100,
      },
      {
        label: "Wash & Iron(Wearable)",
        viewPrice: "100/kg",
        Price: 100,
        newQtyPrice: 100,
      },
      {
        label: "Wash & Iron(Non-Wearable)",
        viewPrice: "120/kg",
        Price: 120,
        newQtyPrice: 120,
      },
    ],
  });
  // const [washAndIron, setWashAndIron] = useState({
  //   label: "Laundry(Wash & Iron)",
  //   children: [
  //     {
  //       label: "Wash & Iron(Wearable)",
  //       viewPrice: "100/kg",
  //       Price: 100,
  //     },
  //     {
  //       label: "Wash & Iron(Non-Wearable)",
  //       viewPrice: "120/kg",
  //       Price: 120,
  //     },
  //   ],
  // });
  const [dryCleanItems, setDryCleanItems] = useState({
    label: "Dryclean",
    children: [
      {
        label: "Shirt/T-shirt",
        Price: 100,
        viewPrice: "100/pcs",
        newQtyPrice: 100,
      },
      {
        label: "Jeans",
        Price: 120,
        viewPrice: "120/pcs",
        newQtyPrice: 120,
      },
      {
        label: "Trousers",
        Price: 100,
        viewPrice: "100/pcs",
        newQtyPrice: 100,
      },
      {
        label: "Blazer/Jacket",
        Price: 250,
        viewPrice: "250/pcs",
        newQtyPrice: 250,
      },
      {
        label: "3 piece Suit",
        Price: 450,
        viewPrice: "450/pcs",
        newQtyPrice: 450,
      },
      {
        label: "2 piece Suit",
        Price: 300,
        viewPrice: "300/pcs",
        newQtyPrice: 300,
      },
      {
        label: "Long Blazer",
        Price: 350,
        viewPrice: "350/pcs",
        newQtyPrice: 350,
      },
      {
        label: "Sweatshirt/Hoodie",
        Price: 250,
        viewPrice: "250/pcs",
        newQtyPrice: 250,
      },
      {
        label: "Winter Coats",
        Price: 350,
        viewPrice: "350/pcs",
        newQtyPrice: 350,
      },
      {
        label: "Heavy Saree",
        Price: 350,
        viewPrice: "350/pcs",
        newQtyPrice: 350,
      },
      {
        label: "Medium Saree",
        Price: 300,
        viewPrice: "300/pcs",
        newQtyPrice: 300,
      },
      {
        label: "Saree",
        Price: 250,
        viewPrice: "250/pcs",
        newQtyPrice: 250,
      },
      {
        label: "Blouse",
        Price: 80,
        viewPrice: "80/pcs",

        newQtyPrice: 80,
      },
      {
        label: "Heavy Blouse",
        Price: 120,
        viewPrice: "120/pcs",
        newQtyPrice: 120,
      },
      {
        label: "Lehnga",
        Price: 250,
        viewPrice: "250/pcs",
        newQtyPrice: 250,
      },
      {
        label: "Medium Lehnga",
        Price: 500,
        viewPrice: "500/pcs",
        newQtyPrice: 500,
      },
      {
        label: "Heavy Lehnga",
        Price: 700,
        viewPrice: "700/pcs",
        newQtyPrice: 700,
      },
      {
        label: "Heavy Dress",
        Price: 500,
        viewPrice: "500/pcs",
        newQtyPrice: 500,
      },
      {
        label: "Dress",
        Price: 350,
        viewPrice: "350/pcs",
        newQtyPrice: 350,
      },
      {
        label: "Heavy Gown",
        Price: 300,
        viewPrice: "300/pcs",
        newQtyPrice: 300,
      },
      {
        label: "Gown",
        Price: 200,
        viewPrice: "200/pcs",
        newQtyPrice: 200,
      },
      {
        label: "Dupatta",
        Price: 80,
        viewPrice: "80/pcs",

        newQtyPrice: 80,
      },
      {
        label: "Heavy Dupatta",
        Price: 100,
        viewPrice: "100/pcs",
        newQtyPrice: 100,
      },
      {
        label: "Kurta Pyjama",
        Price: 250,
        viewPrice: "250/pcs",
        newQtyPrice: 250,
      },
      {
        label: "Shawl",
        Price: 200,
        viewPrice: "200/pcs",
        newQtyPrice: 200,
      },
      {
        label: "Sweater/Cardigan",
        Price: 200,
        viewPrice: "200/pcs",
        newQtyPrice: 200,
      },
      {
        label: "Shrug",
        Price: 200,
        viewPrice: "200/pcs",
        newQtyPrice: 200,
      },
      {
        label: "Leather Jackets",
        Price: 450,
        viewPrice: "450/pcs",
        newQtyPrice: 450,
      },
      {
        label: "Belt",
        Price: 150,
        viewPrice: "150/pcs",
        newQtyPrice: 150,
      },
      {
        label: "Leather Belt",
        Price: 250,
        viewPrice: "250/pcs",
        newQtyPrice: 250,
      },
      {
        label: "Pillow Cover",
        Price: 50,
        viewPrice: "50/pcs",
        newQtyPrice: 50,
      },
      {
        label: "Large Pillow",
        Price: 100,
        viewPrice: "100/pcs",
        newQtyPrice: 100,
      },
      {
        label: "Small Pillow",
        Price: 60,
        viewPrice: "60/pcs",

        newQtyPrice: 60,
      },
      {
        label: "Blanket(single)",
        Price: 300,
        viewPrice: "300/pcs",
        newQtyPrice: 300,
      },
      {
        label: "Blanket(double)",
        Price: 400,
        viewPrice: "400/pcs",
        newQtyPrice: 400,
      },
      {
        label: "Druvet(single)",
        Price: 300,
        viewPrice: "300/pcs",
        newQtyPrice: 300,
      },
      {
        label: "Druvet(double)",
        Price: 400,
        viewPrice: "400/pcs",
        newQtyPrice: 400,
      },
      {
        label: "Druvet(single)",
        Price: 300,
        viewPrice: "300/pcs",
        newQtyPrice: 300,
      },
      {
        label: "Quilt(single)",
        Price: 350,
        viewPrice: "350/pcs",
        newQtyPrice: 350,
      },
      {
        label: "Quilt(double)",
        Price: 450,
        viewPrice: "450/pcs",
        newQtyPrice: 450,
      },
      {
        label: "Bed Cover(single)",
        Price: 250,
        viewPrice: "250/pcs",
        newQtyPrice: 250,
      },
      {
        label: "Bed Cover(double)",
        Price: 350,
        viewPrice: "350/pcs",
        newQtyPrice: 350,
      },
      {
        label: "Bed Sheet(single)",
        Price: 200,
        viewPrice: "200/pcs",
        newQtyPrice: 200,
      },
      {
        label: "Bed Sheet(double)",
        Price: 300,
        viewPrice: "300/pcs",
        newQtyPrice: 300,
      },
      {
        label: "Handbag(Small)",
        Price: 300,
        viewPrice: "300/pcs",
        newQtyPrice: 300,
      },
      {
        label: "Handbag(Medium)",
        Price: 450,
        viewPrice: "450/pcs",
        newQtyPrice: 450,
      },
      {
        label: "Handbag(Large)",
        Price: 450,
        viewPrice: "450/pcs",
        newQtyPrice: 450,
      },
      {
        label: "Sports Bag",
        Price: 400,
        viewPrice: "400/pcs",
        newQtyPrice: 400,
      },
      {
        label: "Leather Bag(Small)",
        Price: 400,
        viewPrice: "400/pcs",
        newQtyPrice: 400,
      },
      {
        label: "Leather Bag(Large)",
        Price: 700,
        viewPrice: "700/pcs",
        newQtyPrice: 700,
      },
    ],
  });
  const [shoeSpa, setShoeSpa] = useState({
    label: "ShoeSpa",
    children: [
      {
        label: "Sport Shoe",
        Price: 500,
        viewPrice: "500/pcs",
        newQtyPrice: 500,
      },
      {
        label: "Sneaker",
        Price: 500,
        viewPrice: "500/pcs",
        newQtyPrice: 500,
      },
      {
        label: "Leather Shoe",
        Price: 600,
        viewPrice: "600/pcs",
        newQtyPrice: 600,
      },
      {
        label: "Suede Shoe",
        Price: 600,
        viewPrice: "600/pcs",
        newQtyPrice: 600,
      },
      {
        label: "Boots",
        Price: 700,
        viewPrice: "700/pcs",
        newQtyPrice: 700,
      },
      {
        label: "Stilettos",
        Price: 600,
        viewPrice: "600/pcs",
        newQtyPrice: 600,
      },
      {
        label: "Sliders",
        Price: 250,
        viewPrice: "250/pcs",
        newQtyPrice: 250,
      },
      {
        label: "Sandel",
        Price: 300,
        viewPrice: "300/pcs",
        newQtyPrice: 300,
      },
    ],
  });

  const handleQuantity = (type, i) => {
    const changedArr = [...items];
    if (changedArr[i].quantity === 0 && type === "-") return;
    if (type === "-") {
      changedArr[i].quantity = changedArr[i].quantity - 1;
      console.log(
        "---------",
        changedArr[i].quantity,
        changedArr[i].newQtyPrice
      );
      changedArr[i].newQtyPrice = changedArr[i].quantity * changedArr[i].price;
    } else if ("+") {
      changedArr[i].quantity = changedArr[i].quantity + 1;
      changedArr[i].newQtyPrice = changedArr[i].quantity * changedArr[i].price;
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

  const handleClick = (obj, type) => {
    let newObj = {
      heading: obj.label,
      subHeading: obj.viewPrice,
      viewPrice: obj.viewPrice,
      quantity: 1,
      price: obj.Price,
      newQtyPrice: obj.Price
    };
    if (type === "DryClean") {
      setDryCleanItems({
        ...dryCleanItems,
        children: dryCleanItems.children.filter((el) => el.label !== obj.label),
      });
    } else if (type === "ShoeSpa") {
      setShoeSpa({
        ...shoeSpa,
        children: shoeSpa.children.filter((el) => el.label !== obj.label),
      });
    } else if (type === "laundry") {
      setLaundry({
        ...laundry,
        children: laundry.children.filter((el) => el.label !== obj.label),
      });
    }
    setItems((prev) => [...prev, newObj]);
  };

  const total = items.reduce((prev, el) => {
    console.log("this is data--> ", prev, el)
    return prev + el.newQtyPrice * 1;
  }, 0);
  console.log("this is total: ", total);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80vw",
          display: "flex",
          flexDirection: "column",
          border: "2px solid black",
          borderRadius: "5px",
          margin: "20px 20px",
        }}
      >
        <div>
          {" "}
          <h5
            style={{
              paddingLeft: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              margin: "10px",
              border: "2px solid black",
              backgroundColor: "teal",
              color: "white",
            }}
          >
            Customer Info:
          </h5>
          <BillCustomerInfo />
        </div>
        <div>
          {" "}
          <h5
            style={{
              paddingLeft: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              margin: "10px",
              border: "2px solid black",
              backgroundColor: "teal",
              color: "white",
            }}
          >
            Added Items:
          </h5>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {items.length > 0 ? (
              <Item
                items={items}
                handleQuantity={handleQuantity}
                inputChange={inputChange}
              />
            ) : (
              <h6>Add Items</h6>
            )}
          </div>
        </div>
        <div>
          <h5
            style={{
              paddingLeft: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              border: "2px solid black",
              margin: "10px",
              backgroundColor: "teal",
              color: "white",
            }}
          >
            Laundry:
          </h5>
          <div
            style={
              laundry.children.length > 0
                ? {}
                : { display: "flex", justifyContent: "center" }
            }
          >
            {laundry.children.length > 0 ? (
              <ItemSlider
                dryCleanItems={dryCleanItems}
                shoeSpa={shoeSpa}
                type={"laundry"}
                laundry={laundry}
                handleClick={handleClick}
              />
            ) : (
              <h6>
                Items Already Added(you can adjust quantity in Added Items)
              </h6>
            )}
          </div>
        </div>
        <div>
          <h5
            style={{
              paddingLeft: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              border: "2px solid black",
              margin: "10px",
              backgroundColor: "teal",
              color: "white",
            }}
          >
            Dry Clean:
          </h5>
          <div
            style={
              dryCleanItems.children.length > 0
                ? {}
                : { display: "flex", justifyContent: "center" }
            }
          >
            {dryCleanItems.children.length > 0 ? (
              <ItemSlider
                dryCleanItems={dryCleanItems}
                shoeSpa={shoeSpa}
                type={"DryClean"}
                laundry={laundry}
                handleClick={handleClick}
              />
            ) : (
              <h6>
                Items Already Added(you can adjust quantity in Added Items)
              </h6>
            )}
          </div>
        </div>
        <div>
          {" "}
          <h5
            style={{
              paddingLeft: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              border: "2px solid black",
              margin: "10px",
              backgroundColor: "teal",
              color: "white",
            }}
          >
            Shoe Spa:
          </h5>
          <div
            style={
              shoeSpa.children.length > 0
                ? {}
                : { display: "flex", justifyContent: "center" }
            }
          >
            {shoeSpa.children.length > 0 ? (
              <ItemSlider
                dryCleanItems={dryCleanItems}
                shoeSpa={shoeSpa}
                type={"ShoeSpa"}
                laundry={laundry}
                handleClick={handleClick}
              />
            ) : (
              <h6>
                Items Already Added(you can adjust quantity in Added Items)
              </h6>
            )}
          </div>
        </div>

        <div>
          {" "}
          <h5
            style={{
              paddingLeft: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              margin: "10px",
              border: "2px solid black",
              backgroundColor: "teal",
              color: "white",
            }}
          >
            Billing Info:
          </h5>
          <BillPriceInfo total={total} />
        </div>
      </div>
    </div>
  );
}

export default BillCart;
