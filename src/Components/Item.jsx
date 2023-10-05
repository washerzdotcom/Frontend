import React, { useState } from 'react';

function Item({items, handleQuantity, inputChange}) {
 
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
    width: '100%',
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
    margin: '0px',
  };

  const paragraphStyle = {
    margin: '10px 0',
  };

  const buttonStyle = {
    padding: '4px 8px',
    fontSize: '10px',
    cursor: 'pointer',
  };

  const innerDivStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <div style={listContainerStyle}>
        {items.map((item, index) => (
          <div key={index} style={listItemStyle}>
            <div style={innerDivStyle}>
              <div className='head' style={{display:"block", width:"50%"}}>
                <h2 style={headingStyle}>{item.heading}</h2>
                <p style={paragraphStyle}>₹{item.subHeading}</p>
              </div>
              <div className='value' style={{display:"block", width:"50%"}}>
                <button
                  style={buttonStyle}
                  onClick={() => handleQuantity('-', index, item.quantity)}
                >
                  -
                </button>
                <input
                  min='0'
                  style={{
                    paddingBottom: '15px',
                    paddingTop: '10px',
                    height: '25px',
                    margin: '5px',
                    textAlign: 'center',
                    width: '40px',
                  }}
                  type='number'
                  value={item.quantity}
                  onChange={(e) => inputChange(index, e.target.value)}
                />
                <button
                  style={buttonStyle}
                  onClick={() => handleQuantity('+', index, item.quantity)}
                >
                  +
                </button>
              </div>
              <div className='price'>
                <h2 style={headingStyle}>Price</h2>
                <span >
                  ₹{item.quantity > 0 ? (item.quantity * item.price).toFixed(2) : 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Item;
