import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Container,
  Row,
  Col,
  Modal,
  Button,
  Spinner,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import moment from "moment";
import "../../style/responsive.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; // Calendar for date picking
import { toast } from "react-toastify";
import useAxiosPrivate from "./../../hooks/useAxiosPrivate";
import useAuth from "./../../hooks/useAuth";
import io from "socket.io-client";
import Loader from "./../Loader";
import axios, { instance } from "./../../config";
import "../../style/order.css";
import Webcamera from "../../Componentsnew/webcam/Webcamera";
import constant from "../../constant";


const { washrzserver } = constant;

// const socket = io(washrzserver);

const Deliver = ({ setActiveTab }) => {
  const [customer, setCustomer] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 8;
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [rescheduleDate, setRescheduleDate] = useState(null); // New state for selected date
  const [showCalendar, setShowCalendar] = useState(false); // Show/Hide calendar
  const [newStatus, setNewStatus] = useState("");
  const [showRescheduleModal, setShowRescheduleModal] = useState(false); // New modal for confirmation
  const [selectedRescheduleId, setSelectedRescheduleId] = useState(null); // Track which pickup is being rescheduled
  const [spinner, setSpinner] = useState(false);
  const { auth } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [CapturedImage, setCapturedImage] = useState(null);
  const [show, setShow] = useState(false);

  const today = new Date();
  const maxDate = new Date(today.setDate(today.getDate() + 7));

  const handleReschedule = async (id) => {
    setSelectedRescheduleId(id); // Store the id of the order being rescheduled
    setShowRescheduleModal(true); // Open confirmation modal
  };

  // Function to handle the Yes/No confirmation response
  const handleRescheduleConfirmation = async (response) => {
    setShowRescheduleModal(false); // Hide confirmation modal
    if (response === "no") {
      // Show a confirmation dialog before proceeding
      const confirmSubmit = window.confirm(
        "Are you sure consumer didn't answer the call?"
      );

      // If the user cancels, stop the function execution
      if (!confirmSubmit) {
        if (auth?.role === "admin") {
          navigate("/order");
        }
        if (auth?.role === "rider") {
          console.log(auth?.role);
          navigate("/rider/pickups");
        }
        return;
      }

      // Automatically reschedule for the next day
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      try {
        const res = await axiosPrivate.put(
          `/rider/rescheduleorder/${selectedRescheduleId}`,
          {
            newDate: nextDay,
          }
        );
        // Send WhatsApp message after order reschedule consumer not pickup call
        await sendWhatsAppTemplateRescheduleNoCall(selectedRescheduleId); // Pass the `id` directly
        if (res.status === 200) {
          toast.success("Pickup successfully rescheduled for the next day");
          setData((prevData) =>
            prevData.filter((item) => item._id !== selectedRescheduleId)
          );
          setActiveTab("Rescheduled");
        }
      } catch (error) {
        console.log("Error:", error);
        toast.error("Failed to reschedule pickup.");
      }
    } else {
      setShowCalendar(true); // Show calendar for date selection
    }
  };

  const sendWhatsAppTemplateRescheduleNoCall = async (orderId) => {
    try {
      const { data: order } = await axiosPrivate.get(
        `auth/getOrderById/${orderId}`
      );

      const templatePayload = {
        template_name: "delivery_rescheduled__unable_to_reach_customer_",
        broadcast_name: `delivery_rescheduled__unable_to_reach_customer__1727433016430`,
        parameters: [
          {
            name: "name",
            value: order.customerName,
          },
        ],
      };

      const response = await instance.post(
        `/sendTemplateMessage?whatsappNumber=${order.contactNo}`,
        templatePayload
      );

      if (response.status === 200) {
        toast.success("WhatsApp message sent successfully!");
      } else {
        toast.error("Failed to send WhatsApp message.");
      }
    } catch (error) {
      console.log("Error sending WhatsApp message:", error);
      toast.error("Error sending WhatsApp message.");
    }
  };

  // Function to handle calendar reschedule
  const confirmReschedule = async () => {
    if (!rescheduleDate) {
      return toast.error("Please select a reschedule date.");
    }

    try {
      const res = await axiosPrivate.put(
        `/rider/rescheduleorder/${selectedRescheduleId}`,
        {
          newDate: rescheduleDate,
        }
      );

      if (res.status === 200) {
        toast.success("Pickup successfully rescheduled");
        // Send WhatsApp message after order reschedule consumer pickup call
        await sendWhatsAppTemplateRescheduleWithCall(selectedRescheduleId);
        setData((prevData) =>
          prevData.filter((item) => item._id !== selectedRescheduleId)
        );
        setShowCalendar(false); // Hide the calendar
        setActiveTab("Rescheduled");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to reschedule pickup.");
    }
  };

  const sendWhatsAppTemplateRescheduleWithCall = async (orderId) => {
    try {
      const { data: order } = await axiosPrivate.get(
        `auth/getOrderById/${orderId}`
      );

      const ReschedulDate = moment(order.rescheduledDate).format(
        "MMMM Do YYYY"
      );
      const templatePayload = {
        template_name: "delivery__rescheduling_notification",
        broadcast_name: `delivery__rescheduling_notification_1727433234938`,
        parameters: [
          {
            name: "name",
            value: order.customerName,
          },
          {
            name: "delivery_rescheduled_date",
            value: ReschedulDate,
          },
        ],
      };

      const response = await instance.post(
        `/sendTemplateMessage?whatsappNumber=${order.contactNo}`,
        templatePayload
      );

      if (response.status === 200) {
        toast.success("WhatsApp message sent successfully!");
      } else {
        toast.error("Failed to send WhatsApp message.");
      }
    } catch (error) {
      console.log("Error sending WhatsApp message:", error);
      toast.error("Error sending WhatsApp message.");
    }
  };
  // useEffect(() => {
  //   socket.on("orderStatusUpdated", (updatedOrder) => {
  //     setCustomer((prevOrders) =>
  //       prevOrders.map((order) =>
  //         order._id === updatedOrder._id ? updatedOrder : order
  //       )
  //     );
  //   });

  //   return () => {
  //     socket.off("orderStatusUpdated");
  //   };
  // }, []);

  const handleComplete = async (id, value) => {
    setCurrentOrderId(id);
    setNewStatus(value);
    setShow(true); // Open confirmation modal
  };
  const handleUpload = async () => {
    if (!CapturedImage) {
      toast.error("Please capture an image.");
      return;
    }
    setShow(false);
    setShowModal(false);
    setSpinner(true);

    const formData = new FormData();
    formData.append("image", CapturedImage); // Ensure this matches 'image'

    try {
      const uploadResponse = await axios.post(
        `/rider/uploadDeliverImage/${currentOrderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update order status on the server
      await axios.patch(`/auth/updateOrderStatus/${currentOrderId}`, {
        status: newStatus, // Use the status passed as a parameter
      });

      // Emit the status update event via socket
      // socket.emit("updateOrderStatus", {
      //   currentOrderId,
      //   status: newStatus,
      // });

      // Send WhatsApp message after order is completed
      await sendWhatsAppTemplateDelivered(currentOrderId); // Pass the `id` directly

      if (uploadResponse.status === 200) {
        toast.success("Order status updated successfully.");
        setCapturedImage(null);
        setSpinner(false);
        setActiveTab("Completed");
      } else {
        toast.error("Error uploading files");
      }
    } catch (error) {
      setSpinner(false);
      toast.error("Error uploading files");
    }
  };

  const sendWhatsAppTemplateDelivered = async (orderId) => {
    try {
      const { data: order } = await axiosPrivate.get(
        `auth/getOrderById/${orderId}`
      );

      const templatePayload = {
        template_name: "delivery_success",
        broadcast_name: `delivery_success_1725377117469`,
        parameters: [
          {
            name: "name",
            value: order.customerName,
          },
        ],
      };

      const response = await instance.post(
        `/sendTemplateMessage?whatsappNumber=${order.contactNo}`,
        templatePayload
      );

      if (response.status === 200) {
        console.log("WhatsApp message sent successfully!");
      } else {
        toast.error("Failed to send WhatsApp message.");
      }
    } catch (error) {
      console.log("Error sending WhatsApp message:", error);
      toast.error("Error sending WhatsApp message.");
    }
  };

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const userEmail = auth?.email;
        // Add status to query string to fetch "processing" orders
        const customer = await axiosPrivate.get(
          `/getOrdersByFilter?limit=${pageSize}&page=${pageNumber}&email=${userEmail}&status=ready for delivery`
        );

        setPageCount(Math.ceil(customer?.data?.total / pageSize));
        setCustomer(customer.data.orders);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getCustomer();
  }, [pageNumber]);

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
  };
  return (
    <>
      <Container className="p-3">
        <h1 className="text-center mb-4">Today's Delivery</h1>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Ready For Delivery Time</th>
                  <th>User Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customer.map((user) => (
                  <tr key={user._id}>
                    <td>{user.customerName}</td>
                    <td>{user.contactNo}</td>
                    <td>{user.address}</td>
                    <td>
                      {moment(user.statusHistory.ReadyForDelivery).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td>
                      {user.orderLocation?.latitude &&
                      user.orderLocation?.longitude ? (
                        <a
                          href={`https://www.google.com/maps?q=${user.orderLocation.latitude},${user.orderLocation.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          tap here
                        </a>
                      ) : (
                        "Location not available"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-success mx-auto d-block m-1"
                        style={{ width: "100%" }}
                        onClick={() => handleComplete(user._id, "delivered")}
                      >
                        Complete
                      </button>
                      {/* Reschedule Button */}
                      <button
                        className="btn btn-outline-primary d-block mx-auto"
                        onClick={() => handleReschedule(user._id)}
                        style={{ width: "100%" }}
                      >
                        Reschedule
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} sm={6}>
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </Col>
          </Row>
        </Container>
      )}
      {/* Modal for Reschedule Confirmation */}
      <Modal
        show={showRescheduleModal}
        onHide={() => setShowRescheduleModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Call Answered</Modal.Title>
        </Modal.Header>
        <Modal.Body>Did the consumer answer the call?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleRescheduleConfirmation("no")}
          >
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => handleRescheduleConfirmation("yes")}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for calendar */}
      <Modal show={showCalendar} onHide={() => setShowCalendar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select any other date for delivery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="calendar-popup">
            <DatePicker
              selected={rescheduleDate}
              onChange={(date) => setRescheduleDate(date)}
              minDate={new Date()}
              maxDate={maxDate} // next 7 days
              placeholderText="Select a new date"
              className="form-control my-2"
            />
            <Button onClick={confirmReschedule} variant="success">
              Confirm Reschedule
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Completed Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to complete this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShow(false);
              setShowModal(true);
            }}
          >
            Complete Order
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Webcamera onCapture={(image) => setCapturedImage(image)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={spinner}
      >
        <Modal.Header>
          <Modal.Title>Uploading Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Spinner animation="border" variant="primary" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Deliver;
