import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { instance, pickupinstance } from "../config";

function BillModal({ billShow, setBillShow, total, currObj, handledelete }) {
  const [dis,setdis] = useState(0);
  console.log("this is curr obj --> ", currObj);
  const addOrder = async () => {
    try {
      console.log("ewhguirehdghreuhgre---------------> ", currObj)
      const res = await pickupinstance.post(`/addOrder`, currObj);
      const sendTemRes = await instance.post(`/sendTemplateMessage?whatsappNumber=${currObj.contactNo}`, 
      {
        template_name: "automated_collection_successfull",
        broadcast_name: "automated_collection_successfull",
        parameters: [
          {
            name: "name",
            value: currObj.customerName
          },
          {
            name: "total_Bill",
            value: (total-total*(dis/100)).toFixed(2)
          }
        ]
      }
      )
      console.log("thi is the sendTemRes---->> ", sendTemRes)
      console.log("addOrder", res.data);
      handledelete(currObj.id);
    } catch (error) {
      console.log("this is error", error);
    }
  };
  return (
    <Modal show={billShow} onHide={() => setBillShow(false)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Your Total Bill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
        Total Bill is: &#x20B9;{total}
        </div>
        <div>
          Discount : <input type={"number"} value={dis} onChange={(e)=>{
            setdis(e.target.value)
            currObj.price = (total-total*(e.target.value/100)).toFixed(2);
            console.log("prceee", currObj.price)
            }}/>
        </div>
        <div>
        Discounted Bill is: &#x20B9;{(total-total*(dis/100)).toFixed(2)}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setBillShow(false);
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            addOrder();
            setBillShow(false);
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BillModal;
