import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import "../style/searchbar.css";
import { Laundary, Dryclean, Shoespa } from "../utills/product";

const newArr = [
  ...Laundary.children,
  ...Dryclean.children,
  ...Shoespa.children,
];

const DropdownExampleSearchSelection = ({ handleClick }) => {
  let updatedArr = newArr.map((el) => {
    return {
      key: "bj",
      value: el.label,
      image: { avatar: true, src: require(`../assets/washrzimages/${el.img}`) },
      text: `${el.label}(${el.viewPrice})`,
      ...el,
    };
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState(updatedArr);

  const handleDropdownChange = (e, data) => {
    const selectedItemValue = data.value;
    const selectedItemObject = updatedArr.find(
      (item) => item.value === selectedItemValue
    );
    updatedArr = updatedArr.filter((item) => item.value !== selectedItemValue);

    setSelectedItem(selectedItemObject);
    setDropdownOptions(updatedArr); // Update the dropdown options
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "90%" }}>
        <Dropdown
          className="search"
          placeholder="Select Items"
          fluid
          search
          selection
          options={dropdownOptions}
          onChange={handleDropdownChange}
          value={selectedItem ? selectedItem.value : null} // Set the selected value
        />
      </div>
      <button
        style={{
          borderRadius: "10px",
          backgroundColor: "teal",
          color: "white",
          width: "10%",
        }}
        onClick={() => {
          handleClick(selectedItem, selectedItem.type);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default DropdownExampleSearchSelection;
