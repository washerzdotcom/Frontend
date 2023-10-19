import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Loader from "./Loader";
import "../style/responsive.css"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import "./CustomerDetails.css"; // Import your custom CSS file

const CustomerDetails = () => {
  const [customer, setCustomer] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // New state for the loading indicator
  const pageSize = 8; // Adjust to your preferred page size
  const axiosPrivate = useAxiosPrivate();

  const getCustomer = async (key) => {
    try {
      const customer = await axiosPrivate.get(
        `/getOrders?limit=${pageSize}&page=${pageNumber}`
      );
      console.log("-----------------data", customer.data);
      setPageCount(Math.ceil(customer?.data?.total / pageSize));
      setCustomer([...customer.data.orders]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomer();
  }, [pageNumber]);

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
  };

  console.log("pageNumber---> ", pageNumber);
  return (
    <>
      <Container fluid className="p-3">
        <h1 className="text-center mb-4">Orders</h1>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Order No.</th>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Pickup Time</th>
                  <th>Total Bill</th>
                </tr>
              </thead>
              <tbody>
                {customer.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.order_id}</td>
                      <td>{user.customerName}</td>
                      <td>{user.contactNo}</td>
                      <td>{user.address}</td>
                      <td>
                        {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                      </td>
                      <td>₹{user.price}</td>
                    </tr>
                  );
                })}
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
    </>
  );
};

export default CustomerDetails;
