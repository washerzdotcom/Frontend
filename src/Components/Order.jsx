import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container, Row, Col, Modal, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Loader from "./Loader";
import "../style/responsive.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Select } from "antd";
import io from "socket.io-client";
import axios, { instance } from "../config";
import { toast } from "react-toastify";
import "../style/order.css";
import Recorder from "../Componentsnew/Recorder/Recorder";
import Webcamera from "../Componentsnew/webcam/Webcamera";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import constant from "../constant";

const {  washrzserver } = constant;

const { Option } = Select;
// const socket = io(washrzserver); // Update with your backend URL

const CustomerDetails = () => {
  const [customer, setCustomer] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [CapturedImage, setCapturedImage] = useState(null);
  const [voiceFile, setVoiceFile] = useState(null);
  const [show, setShow] = useState(false);
  const [isLoadings, setIsLoadings] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [voiceUrl, setVoiceUrl] = useState(null);
  const { auth } = useAuth();
  const pageSize = 8;
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const userEmail = auth?.email;
        const customer = await axiosPrivate.get(
          `/getOrders?limit=${pageSize}&page=${pageNumber}&email=${userEmail}`
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

  const handleChange = async (id, value) => {
    setCurrentOrderId(id);
    setNewStatus(value);
    setShow(true); // Open confirmation modal
  };

  const handleClose = async () => {
    setShow(false); // Close confirmation modal
    setIsLoadings(true);

    try {
      if (newStatus === "processing") {
        setShowModal(true); // Open file upload modal
      } else {
        await axios.patch(`/auth/updateOrderStatus/${currentOrderId}`, {
          status: newStatus,
        });
        // socket.emit("updateOrderStatus", {
        //   id: currentOrderId,
        //   status: newStatus,
        // });

        // Trigger the WhatsApp template if status is 'ready for delivery'
        if (newStatus === "ready for delivery") {
          sendWhatsAppTemplate(currentOrderId);
        }
        if (newStatus === "delivered") {
          sendWhatsAppTemplateDelivered(currentOrderId);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating order status.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecordingComplete = (audioBlob) => {
    setVoiceFile(audioBlob); // Save the recorded audio as a file
  };

  const handleUpload = async () => {
    if (!CapturedImage) {
      toast.error("Please capture an image.");
      return;
    }

    if (!voiceFile) {
      toast.error("Please record an audio file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", CapturedImage); // Ensure this matches 'image'
    formData.append("voice", voiceFile); // Ensure this matches 'voice'

    try {
      const uploadResponse = await axios.post(
        `/auth/uploadFiles/${currentOrderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadResponse.status === 200) {
        toast.success("Files uploaded successfully");
        setCapturedImage(null);
        setVoiceFile(null);
        setShowModal(false);
      } else {
        toast.error("Error uploading files");
      }
    } catch (error) {
      toast.error("Error uploading files");
    }
  };

  const sendWhatsAppTemplate = async (orderId) => {
    try {
      const { data: order } = await axiosPrivate.get(
        `auth/getOrderById/${orderId}`
      );

      const templatePayload = {
        template_name: "delivery_update_no_gst",
        broadcast_name: `delivery_update_no_gst_${orderId}`,
        parameters: [
          {
            name: "name",
            value: order.customerName,
          },
          {
            name: "total_bill",
            value: order.price,
          },
          {
            name: "service",
            value: order.service || "na",
          },
          {
            name: "invoice__payment_link",
            value: "na",
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
        toast.success("WhatsApp message sent successfully!");
      } else {
        toast.error("Failed to send WhatsApp message.");
      }
    } catch (error) {
      console.log("Error sending WhatsApp message:", error);
      toast.error("Error sending WhatsApp message.");
    }
  };

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
  };

  // Modified to filter status options based on current status
  const getAvailableStatuses = (currentStatus) => {
    const statusFlow = {
      intransit: ["processing"],
      processing: ["ready for delivery"],
      "ready for delivery": ["delivered"],
    };
    return statusFlow[currentStatus] || [];
  };

  // show image and voice
  const handleOrderView = async (orderId) => {
    setSelectedOrder(orderId);
    setShowMedia(true);

    try {
      const { data } = await axios.get(`/auth/getMedia/${orderId}`);
      setPhotoUrl(data.imageUrl);
      setVoiceUrl(data.voiceUrl);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  // show deliver image
  const handleDeliveriesView = async (orderId) => {
    setSelectedOrder(orderId);
    setShowMedia(true);

    try {
      const { data } = await axios.get(`/auth/getMedia/${orderId}`);
      setPhotoUrl(data.deliverImage);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  const handleView = async (orderId) => {
    setSelectedOrder(orderId);
    setShowMedia(true);

    try {
      const { data } = await axios.get(`/auth/getMedia/${orderId}`);
      setPhotoUrl(data.intransitimg);
      setVoiceUrl(data.intransitvoi);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  const handleNull = () => {
    setShowMedia(false);
    setPhotoUrl(null);
    setVoiceUrl(null);
    setSelectedOrder(null);
  };

  return (
    <>
      <Container className="p-3">
        <h1 className="text-center mb-4">Orders</h1>
        <Row>
          <Col>
            <Table responsive>
              <thead>
                <tr>
                  <th>Order No.</th>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Pickup Time</th>
                  <th>plant</th>
                  <th>Total Bill</th>
                  <th>Update Status</th>
                  <th>Location</th>
                  <th>Photo/voice</th>
                </tr>
              </thead>
              <tbody>
                {customer.map((user) => (
                  <tr key={user._id}>
                    <td>{user.order_id}</td>
                    <td>{user.customerName}</td>
                    <td>{user.contactNo}</td>
                    <td>{user.address}</td>
                    <td>
                      {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </td>
                    <td>{user.plantName}</td>
                    <td>₹{user.price}</td>
                    <td className="text-capitalize">
                      <Select
                        bordered={false}
                        className={`custom-select ${
                          user.status === "delivered" ? "delivered" : ""
                        }`} // Add class based on status
                        popupClassName="custom-select-dropdown"
                        onChange={(value) => handleChange(user._id, value)}
                        defaultValue={user?.status}
                        disabled={user.status === "delivered"} // Disable dropdown for delivered status
                      >
                        {getAvailableStatuses(user.status).map((status) => (
                          <Option key={status} value={status}>
                            {status}
                          </Option>
                        ))}
                      </Select>
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

                    <td className="d-grid gap-2">
                      <button
                        onClick={() => handleView(user._id)}
                        type="button"
                        class="btn btn-outline-success"
                      >
                        Pickup Veiw
                      </button>
                      <button
                        onClick={() => handleOrderView(user._id)}
                        type="button"
                        class="btn btn-outline-primary"
                        disabled={user.status === "intransit"}
                      >
                        Order Veiw
                      </button>
                      <button
                        onClick={() => handleDeliveriesView(user._id)}
                        type="button"
                        class="btn btn-outline-primary"
                        disabled={user.status !== "delivered"}
                      >
                        Deliveries Veiw
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

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Status Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change the status of this order to "
          {newStatus}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
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
            <Recorder onRecordingComplete={handleRecordingComplete} />
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

      {isLoading && <Loader />}

      {/* Modal to show photo and voice */}
      <Modal show={showMedia} onHide={handleNull}>
        <Modal.Header closeButton>
          <Modal.Title>Photo and Voice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {photoUrl ? (
            <div>
              <h3>Photo</h3>
              <img src={photoUrl} alt="Order" className="img-fluid" />
            </div>
          ) : (
            <p>No photo available.</p>
          )}
          {voiceUrl ? (
            <div>
              <h3>Voice Note</h3>
              <audio controls>
                <source src={voiceUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <p>No voice note available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNull}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomerDetails;
