import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
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
import DatePicker from "react-datepicker"; // Calendar for date picking
import "react-datepicker/dist/react-datepicker.css";
import Recorder from "./../Componentsnew/Recorder/Recorder";
import { instance } from "./../config";

const ALLOWED_ROLES = {
  ADMIN: "admin",
  RIDER: "rider",
  PLANT_MANAGER: "plant_manager",
};

const LiveDelivery = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const { currObj, setCurrObj } = useAuth();
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 8;
  const [pageNumber, setPageNumber] = useState(1);
  const [showSuc, setShowSuc] = useState(false);
  const [billShow, setBillShow] = useState(false);
  const [total, setTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [priceConfig, setPriceConfig] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const [rescheduleDate, setRescheduleDate] = useState(null); // New state for selected date
  const [showCalendar, setShowCalendar] = useState(false); // Show/Hide calendar
  const [showModal, setShowModal] = useState(false); // Modal state
  const [cancelPickupId, setCancelPickupId] = useState(null); // Track which pickup is being canceled
  const [note, setNote] = useState(""); // Short note
  const [recordedVoice, setRecordedVoice] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false); // New modal for confirmation
  const [selectedRescheduleId, setSelectedRescheduleId] = useState(null); // Track which pickup is being rescheduled
  const { auth } = useAuth();

  const today = new Date();
  const maxDate = new Date(today.setDate(today.getDate() + 7));

  // Handle voice recording complete
  const handleRecordingComplete = (voiceData) => {
    if (voiceData) {
      setRecordedVoice(voiceData);
    } else {
      toast.error("Voice recording must not exceed 15 seconds.");
    }
  };

  const handleUpload = async () => {
    if (!note.trim()) {
      return toast.error("Short note is required.");
    }
    // Check if the note has at least 15 characters
    if (!note.trim() || note.trim().length < 50) {
      return toast.error("Short note must contain at least 15 characters.");
    }

    try {
      // Upload to AWS S3 logic here
      const formData = new FormData();
      formData.append("note", note);
      if (recordedVoice) {
        formData.append("voice", recordedVoice); // If there's a voice recording, upload it as well
      }

      // Upload to S3 and cancel the pickup
      const response = await axiosPrivate.post(
        `/rider/uploadCancelInfo/${cancelPickupId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Files uploaded and pickup successfully cancelled");
        setShowModal(false);
        setData((prevData) =>
          prevData.filter((item) => item._id !== cancelPickupId)
        );
        setActiveTab("Cancelled");
      }
    } catch (error) {
      console.log("Error uploading files:", error);
      toast.error("Failed to cancel pickup.");
    }
  };

  const handledelete = async (id) => {
    // Show a confirmation dialog before proceeding
    const confirmSubmit = window.confirm(
      "Are you sure you want to delete this pickup?"
    );

    // If the user cancels, stop the function execution
    if (!confirmSubmit) return;

    // Open the modal for note and voice upload
    setCancelPickupId(id);
    setShowModal(true);
  };

  const handleReschedule = async (id) => {
    setSelectedRescheduleId(id); // Store the id of the pickup being rescheduled
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
          `/rider/reschedulePickup/${selectedRescheduleId}`,
          {
            newDate: nextDay,
          }
        );
        // Send WhatsApp message after pickup reschedule consumer not pickup call
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

  const sendWhatsAppTemplateRescheduleNoCall = async (pickupId) => {
    try {
      const { data: pickup } = await axiosPrivate.get(
        `auth/getPickupById/${pickupId}`
      );

      const templatePayload = {
        template_name: "pickup_rescheduled__unable_to_reach_customer",
        broadcast_name: `pickup_rescheduled__unable_to_reach_customer_1727358771391`,
        parameters: [
          {
            name: "name",
            value: pickup.Name,
          },
        ],
      };

      const response = await instance.post(
        `/sendTemplateMessage?whatsappNumber=${pickup.Contact}`,
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
        `/rider/reschedulePickup/${selectedRescheduleId}`,
        {
          newDate: rescheduleDate,
        }
      );

      // Send WhatsApp message after pickup reschedule consumer pickup call
      await sendWhatsAppTemplateRescheduleWithCall(selectedRescheduleId);
      if (res.status === 200) {
        toast.success("Pickup successfully rescheduled");
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

  const sendWhatsAppTemplateRescheduleWithCall = async (pickupId) => {
    try {
      const { data: pickup } = await axiosPrivate.get(
        `auth/getPickupById/${pickupId}`
      );

      const ReschedulDate = moment(pickup.rescheduledDate).format(
        "MMMM Do YYYY"
      );
      const templatePayload = {
        template_name: "pickup_rescheduling_notification",
        broadcast_name: `pickup_rescheduling_notification_1727356193348`,
        parameters: [
          {
            name: "name",
            value: pickup.Name,
          },
          {
            name: "pickup_rescheduled_date",
            value: ReschedulDate,
          },
        ],
      };

      const response = await instance.post(
        `/sendTemplateMessage?whatsappNumber=${pickup.Contact}`,
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

  // const getPickups = () => {
  //   axiosPrivate
  //     .get(`/getAssignedPickups?limit=${pageSize}&page=${pageNumber}`)
  //     .then((response) => {
  //       setData([...response?.data?.Pickups]);
  //       setPageCount(Math.ceil(response?.data?.total / pageSize));
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setIsLoading(false);
  //     });
  // };
  const getPickups = () => {
    const userEmail = auth?.email; // Assuming auth.email contains the user's email
    axiosPrivate
      .get(
        `/getAssignedPickups?limit=${pageSize}&page=${pageNumber}&email=${userEmail}`
      )
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

  useEffect(() => {
    // socket.on("addPickup", (data) => {
    //   setData((prev) => [data, ...prev]);
    // });

    getPickups();
  }, [pageNumber]);

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
  };

  const userRole = auth?.role;

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
                    <th>plant</th>
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
                            <button
                              className="btn btn-outline-success mx-auto d-block m-1"
                              style={{ width: "100%" }}
                              onClick={() => {
                                setCurrObj({
                                  contactNo: user.Contact,
                                  customerName: user.Name,
                                  address: user.Address,
                                  plantName: user.plantName,
                                  items: [],
                                  price: 0,
                                  id: user._id,
                                });
                                if (userRole === ALLOWED_ROLES.ADMIN) {
                                  navigate("/Product-Bill");
                                } else if (userRole === ALLOWED_ROLES.RIDER) {
                                  navigate("/rider/Product-Bill");
                                }
                              }}
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
                            <button
                              onClick={() => handledelete(user._id)}
                              className="btn btn-outline-danger d-block mx-auto m-1"
                              disabled={isLoading}
                              style={{ width: "100%" }}
                            >
                              Cancel
                            </button>
                          </td>
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
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Enter a short note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                />
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
        </div>
      </div>
    </div>
  );
};

export default LiveDelivery;
