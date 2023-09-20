import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NestedDropdown from './MultiSelector';
import { Card, Table } from 'react-bootstrap';
import '../App.css';
import { toast, ToastContainer } from 'react-toastify';

function Example({ showSuc, setShowSuc, setBillShow, setTotal, setCurrObj }) {
  const [menuItems, setMenuItems] = useState([]);

  const handleClose = () => setShowSuc(false);

  const deleteTask = (index) => {
    const filteredItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(filteredItems);
  };

  const priceConfig = {
    'Wash and Fold': {
      'Wearable': 80,
      'Non-Wearable': 100,
    },
    'Wash and Iron': {
      'Wearable': 100,
      'Non-Wearable': 120,
    },
  };

  const total = menuItems.reduce((acc, item) => {
    const price = priceConfig[item.type] && priceConfig[item.type][item.wearType]
      ? item.weight * priceConfig[item.type][item.wearType]
      : item.Price;
    return acc + price;
  }, 0);

  return (
    <>
      <Modal show={showSuc} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>Added Items</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Group</th>
                    <th>Type</th>
                    <th>WearType</th>
                    <th>Weight/Quantity</th>
                    <th>Price</th>
                    <th>Remove Items</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.length === 0 ? (
                    <tr>
                      <td colSpan="6">
                        <b style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>No Data</b>
                      </td>
                    </tr>
                  ) : (
                    menuItems.map((item, index) => {
                      console.log("this is item.price---> ", item.Price)
                      let price = item.Price;
                      if(item.wearType !== '-')
                      {
                        price = priceConfig[item.type] && priceConfig[item.type][item.wearType]
                        ? item.weight * priceConfig[item.type][item.wearType]
                        : 0;
                      }

                      return (
                        <tr key={index}>
                          <td>{item.group}</td>
                          <td>{item.type}</td>
                          <td>{item.wearType}</td>
                          <td>{item.wearType === '-' ? `${item.weight} unit` : `${item.weight} kg`}</td>
                          <td>&#x20B9;{price}</td>
                          <td>
                            <button className='btn btn-danger pl-5 d-flex justify-content-center' onClick={() => deleteTask(index)}>x</button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <NestedDropdown menuItems={menuItems} setMenuItems={setMenuItems} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            setBillShow(true);
            setShowSuc(false);
            setTotal(total);
            setCurrObj((prev)=>{return {...prev, items: [...menuItems], price: total}})
          }}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Example;
