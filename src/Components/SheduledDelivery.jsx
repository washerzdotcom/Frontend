import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import moment from "moment";
import Example from "./SucessModal";
import BillModal from "./BillModal";
import Loader from "./Loader";
import "../style/responsive.css";
import socket from "../utills/socket";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../config";

const SheduledDelivery = ({ type, setActiveTab }) => {
  const { currObj, setCurrObj } = useAuth();
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 8;
  const [pageNumber, setPageNumber] = useState(1);
  const [showSuc, setShowSuc] = useState(false);
  const [billShow, setBillShow] = useState(false);
  const [total, setTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New state for loading indicator
  const [priceConfig, setPriceConfig] = useState({});
  const [voiceUrl, setVoiceUrl] = useState(null);
  const [note, setNote] = useState(null);
  const [showMedia, setShowMedia] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState(null);
  const { auth } = useAuth();

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handledelete = async (id) => {
    try {
      setIsLoading(true);
      setData([]);
      const res = await axiosPrivate.put(`/deletePickup/${id}`);
      console.log("console", res);
      if (res.status === 200) {
        getPickups();
        setActiveTab("Cancelled");
        toast.success("Pickup is successfully cancelled");
      }
    } catch (error) {
      console.log("this is error", error);
    }
  };

  const getPickups = () => {
    const userEmail = auth?.email; // Assuming auth.email contains the logged-in user's email
    const url = type === "cancel" ? "/getCancelPickups" : "/getSchedulePickups";

    axiosPrivate
      .get(`${url}?limit=${pageSize}&page=${pageNumber}&email=${userEmail}`)
      .then((response) => {
        setData([...response?.data?.Pickups]);
        setPageCount(Math.ceil(response?.data?.total / pageSize));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    // socket.on("addSchedulePickup", (data) => {
    //   setData((prev) => [data, ...prev]);
    // });
    getPickups();
  }, [pageNumber]);

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
  };

  const handleView = async (pickupId) => {
    setSelectedPickup(pickupId);
    setShowMedia(true);
    try {
      const { data } = await axios.get(`/rider/getCancelMedia/${pickupId}`);
      setVoiceUrl(data.voiceUrl);
      setNote(data.cancelNote);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="p-3">
            {" "}
            {/* Reduced padding for smaller screens */}
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact Number</th>
                    <th>Booking Time</th>
                    <th>Address</th>
                    <th>Slot Timings</th>
                    {type === "cancel" ? (
                      <>
                        <th>Action</th>
                        {/* <th>Note/Voice</th> */}
                      </>
                    ) : null}
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
                          <td>{user.slot}</td>
                          {type === "cancel" ? (
                            <>
                              {/* <td>
                                <button
                                  className="btn btn-outline-success d-block mx-auto m-1"
                                  style={{ width: "100%" }} // Add this inline style
                                  onClick={() => {
                                    setCurrObj({
                                      contactNo: user.Contact,
                                      customerName: user.Name,
                                      address: user.Address,
                                      items: [],
                                      price: 0,
                                      id: user._id,
                                    });
                                    navigate("/Product-Bill");
                                  }}
                                >
                                  Complete
                                </button>
                                <button
                                  onClick={() => handledelete(user._id)}
                                  className="btn btn-outline-danger d-block mx-auto" // Add these classes
                                  disabled={isLoading ? true : false}
                                  style={{ width: "100%" }} // Add this inline style
                                >
                                  Cancel
                                </button>
                              </td> */}
                              <td className="d-grid gap-2">
                                <button
                                  onClick={() => handleView(user._id)}
                                  type="button"
                                  class="btn btn-outline-success"
                                >
                                  {/* <Eye size={24} /> Eye icon to open the modal */}
                                  Pickup Veiw
                                </button>
                              </td>
                            </>
                          ) : null}
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
            {showSuc && (
              <Example
                showSuc={showSuc}
                setShowSuc={setShowSuc}
                setBillShow={setBillShow}
                setTotal={setTotal}
                setCurrObj={setCurrObj}
                setPriceConfig={setPriceConfig}
              />
            )}
            {billShow && (
              <BillModal
                billShow={billShow}
                setBillShow={setBillShow}
                total={total}
                currObj={currObj}
                handledelete={handledelete}
                priceConfig={priceConfig}
              />
            )}
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

          {/* Modal to show note and voice */}
          <Modal show={showMedia} onHide={() => setShowMedia(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Voice and Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {note ? (
                <div>
                  <h3>Note</h3>
                  <p>{note}</p>
                </div>
              ) : (
                <p>No Note available.</p>
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
              <Button variant="secondary" onClick={() => setShowMedia(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SheduledDelivery;
