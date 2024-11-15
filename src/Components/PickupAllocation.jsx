import React, { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Loader from "./Loader";
import "../style/responsive.css";
import socket from "../utills/socket";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "react-datepicker/dist/react-datepicker.css";

const PickupAllocation = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 8;
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [plants, setPlants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  // Function to fetch pickups
  const getPickups = () => {
    axiosPrivate
      .get(`/getPickups?limit=${pageSize}&page=${pageNumber}`)
      .then((response) => {
        setData([...response?.data?.Pickups]);
        setPageCount(Math.ceil(response?.data?.total / pageSize));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  // Function to fetch plants
  const fetchPlants = async () => {
    try {
      const response = await axiosPrivate.get("plant/getAllPlants");
      setPlants(response.data); // Set the list of plants in state
    } catch (error) {
      console.error("Failed to fetch plants. Please try again.");
    }
  };

  useEffect(() => {
    socket.on("addPickup", (data) => {
      setData((prev) => [data, ...prev]);
    });

    getPickups();
    fetchPlants();
  }, [pageNumber]);

  // Handle plant assignment to a pickup using plant name
  const assignPlant = async (plantName) => {
    try {
      const response = await axiosPrivate.put(
        `/plant/assignPlant/${selectedPickup._id}`,
        { plantName } // Sending plant name instead of ID
      );
      const updatedPickup = response.data.updatedPickup;

      // Update the data state with the newly assigned plant
      setData((prevData) =>
        prevData.map((pickup) =>
          pickup._id === updatedPickup._id ? updatedPickup : pickup
        )
      );

      setShowModal(false); // Close modal after successful update
    } catch (error) {
      console.error("Error assigning plant:", error);
    }
  };

  // Handle modal show for specific pickup
  const handleSelectPlantClick = (pickup) => {
    setSelectedPickup(pickup);
    setShowModal(true);
  };

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="p-3 mx-0">
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact Number</th>
                    <th>Booking Time</th>
                    <th>Address</th>
                    <th>Plant</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(data) &&
                    data.length > 0 &&
                    data.map((user) => {
                      return (
                        <tr key={user._id}>
                          <td>{user.Name}</td>
                          <td>{user.Contact}</td>
                          <td>
                            {moment(user.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </td>
                          <td>{user.Address}</td>
                          <td>{user.plantName}</td>
                          <td>
                            {user.plantName ? (
                              // Show the Reallocate Rider button if riderName exists
                              <button
                                className="btn btn-outline-primary d-block mx-auto"
                                style={{ width: "100%" }}
                                onClick={() => handleSelectPlantClick(user)}
                              >
                                Reassign Plant
                              </button>
                            ) : (
                              // Show the Allocate Rider button if riderName doesn't exist
                              <button
                                className="btn btn-outline-success mx-auto d-block m-1"
                                style={{ width: "100%" }}
                                onClick={() => handleSelectPlantClick(user)}
                              >
                                Assign Plant
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>
          {isLoading ? (
            <Loader loading={isLoading} />
          ) : (
            <div>
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
            </div>
          )}
        </div>
      </div>

      {/* Modal for Selecting Plant */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Plant for Pickup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropdownButton id="dropdown-basic-button" title="Select Plant">
            {plants.length > 0 &&
              plants.map((plant) => (
                <Dropdown.Item
                  key={plant._id}
                  onClick={() => assignPlant(plant.name)} // Use plant name instead of ID
                >
                  {plant.name}
                </Dropdown.Item>
              ))}
          </DropdownButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PickupAllocation;
