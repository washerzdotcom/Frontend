import React, { useState } from 'react';

function Item({items, handleQuantity,inputChange}) {
  const containerStyle = {
    width: '100%',
    margin: '0 auto',
    padding: '20px',
  };

  const listContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  };

  const listItemStyle = {
    width: '100%', // Set the width of each list item to 80% of the container width
    background: 'white',
    padding: '5px 25px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const headingStyle = {
    fontSize: '20px',
    margin: '0',
  };

  const paragraphStyle = {
    margin: '10px 0',
  };

  const buttonStyle = {
    padding: '4px 8px',
    fontSize: '10px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={listContainerStyle}>
        {items.map((item, index) => (
          <div key={index} style={listItemStyle}>
            <div>
              <h2 style={headingStyle}>{item.heading}</h2>
              <p style={paragraphStyle}>{item.subHeading}</p>
            </div>
            <div style={{ marginRight: index === 1 || index === 3 ? '8%' : '0px'}}>
              <button style={buttonStyle} onClick={() => handleQuantity('-', index)}>-</button>
              <input style={{paddingBottom: '15px',paddingTop: '10px',height: '25px', margin: "5px", textAlign: 'center', width: '40px'}}type='text' value={item.quantity} onChange={(e)=> inputChange(index, e.target.value)}/>
              {/* <span style={{ margin: '0 10px' }}>{item.quantity}</span> */}
              <button style={buttonStyle} onClick={() => handleQuantity('+', index)}>+</button>
            </div>
            <div>
              <h2 style={headingStyle}>Price</h2>
              <span style={{ margin: '0 10px' }}>₹{item.quantity > 0 ? item.quantity*item.viewPrice : 0}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Item;
