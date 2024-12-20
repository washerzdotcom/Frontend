import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Table, Container, Row, Col } from "react-bootstrap";
import {
  Table,
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Loader from "./Loader";
import "../style/responsive.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const ReadyForDelivery = () => {
  const [customer, setCustomer] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [riders, setRiders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRider, setSelectedRider] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  const pageSize = 8;
  const axiosPrivate = useAxiosPrivate();

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
  useEffect(() => {
    const getRiders = async () => {
      try {
        const ridersData = await axiosPrivate.get("plant/getRiders");
        setRiders(ridersData.data);
      } catch (error) {
        console.error("Failed to fetch riders:", error);
      }
    };

    getRiders();
  }, []);
  const handleSelectRiderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  const handleRiderSelection = async () => {
    try {
      await axiosPrivate.patch(`plant/assignRider`, {
        orderId: selectedOrder._id,
        riderName: selectedRider,
      });

      // Update local state
      setCustomer((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, riderName: selectedRider }
            : order
        )
      );
      setShowModal(false);
      toast.success(`Order assinged to ${selectedRider}`);
    } catch (error) {
      console.error("Failed to assign rider:", error);
    }
  };

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
  };

  return (
    <>
      <Container className="p-3">
        <h1 className="text-center mb-4">Ready For Delivery</h1>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Order No.</th>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Ready For Delivery Time</th>
                  <th>Total Bill</th>
                  <th>Status</th>
                  <th>Rider</th>
                  <th>Action</th>
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
                      {moment(user.statusHistory.readyForDelivery).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td>₹{user.price}</td>
                    <td className="text-capitalize">{user.status}</td>
                    <td>{user.riderName || "Not Assigned"}</td>
                    {/* <td>
                      <button
                        className="btn btn-outline-success mx-auto d-block m-1"
                        style={{ width: "100%" }}
                        onClick={() => handleSelectRiderClick(user)}
                      >
                        Reassign Rider
                      </button>
                    </td> */}
                    <td>
                      {user.riderName ? (
                        // Show the Reallocate Rider button if riderName exists
                        <button
                          className="btn btn-outline-primary d-block mx-auto"
                          style={{ width: "100%" }}
                          onClick={() => handleSelectRiderClick(user)}
                        >
                          Reassign Rider
                        </button>
                      ) : (
                        // Show the Allocate Rider button if riderName doesn't exist
                        <button
                          className="btn btn-outline-success d-block mx-auto"
                          style={{ width: "100%" }}
                          onClick={() => handleSelectRiderClick(user)}
                        >
                          Assign Rider
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      {/* Rider Selection Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Rider</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="riderSelect">
            <Form.Label>Select a Rider</Form.Label>
            <Form.Control
              as="select"
              value={selectedRider}
              onChange={(e) => setSelectedRider(e.target.value)}
            >
              <option value="">Choose Rider</option>
              {riders.map((rider) => (
                <option key={rider._id} value={rider.name}>
                  {rider.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRiderSelection}>
            Assign Rider
          </Button>
        </Modal.Footer>
      </Modal>

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
    </>
  );
};

export default ReadyForDelivery;
