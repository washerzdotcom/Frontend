import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Loader from "../Loader";
import "../../style/responsive.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const Rescheduled = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rescheduledPickups, setRescheduledPickups] = useState([]);
  const { auth } = useAuth();
  const pageSize = 8;
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getRescheduledPickups = async () => {
      try {
        setIsLoading(true);
        const userEmail = auth?.email; // Assuming `auth.email` contains the user's email

        // Fetch rescheduled pickups with user email as a query parameter
        const response = await axiosPrivate.get(
          `/rider/rescheduled-pickups?page=${pageNumber}&pageSize=${pageSize}&email=${userEmail}`
        );

        setRescheduledPickups(response.data.data); // Store the rescheduled pickups in state
        setPageCount(Math.ceil(response.data.total / pageSize));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching rescheduled pickups:", error);
      }
    };

    getRescheduledPickups();
  }, [pageNumber, axiosPrivate]);

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
  };

  return (
    <>
      <Container className="p-3">
        <h1 className="text-center mb-4">Rescheduled Pickups</h1>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>plant</th>
                  <th>Rescheduled Date</th>
                </tr>
              </thead>
              <tbody>
                {rescheduledPickups.map((pickup) => (
                  <tr key={pickup._id}>
                    <td>{pickup.Name}</td>
                    <td>{pickup.Contact}</td>
                    <td>{pickup.Address}</td>
                    <td>{pickup.plantName}</td>
                    <td>
                      {moment(pickup.rescheduledDate).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
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
    </>
  );
};

export default Rescheduled;
