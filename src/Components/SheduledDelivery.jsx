import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { instance, pickupinstance } from "../config";
import ReactPaginate from "react-paginate";
import constant from "../constant";
import moment from "moment";
import Example from "./SucessModal";
import BillModal from "./BillModal";
import ClipLoader from "react-spinners/ClipLoader";
import Loader from "./Loader";
import "../style/responsive.css";
import socket from "../utills/socket";


const SheduledDelivery = ({type}) => {
  console.log("type------------------->",type);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const pageSize = 8;
  const [pageNumber, setPageNumber] = useState(1);
  const [showSuc, setShowSuc] = useState(false);
  const [billShow, setBillShow] = useState(false);
  const [total, setTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New state for loading indicator
  const [currObj, setCurrObj] = useState({
    contactNo: "",
    customerName: "",
    address: "",
    items: [],
    price: 0,
    id: "",
  });

  const handledelete = async (id) => {
    try {
      setIsLoading(true);
      setData([]);
      const res = await pickupinstance.put(`/deletePickup/${id}`);
      console.log("console", res);
      if (res.status === 200) {
        getPickups();
        // toast.success("Order Added Successfully!", {
        //   position: toast.POSITION.TOP_CENTER
        // });
      }
    } catch (error) {
      console.log("this is error", error);
    }
  };

  const getPickups = () => {
    const url= type === 'cancel' ? '/getCancelPickups': '/getSchedulePickups';
    pickupinstance
      .get(`${url}?limit=${pageSize}&page=${pageNumber}`)
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
    socket.on("addSchedulePickup", (data) => {
      setData((prev) => [data, ...prev]);
    });
    getPickups();
  }, [pageNumber]);

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
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
                    {type !== 'cancel' ? <th>Action</th> : null}
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
                          {type !== 'cancel' ? <td>
                            <button
                              className="btn btn-outline-success d-block mx-auto m-1"
                              style={{ width: "100%" }} // Add this inline style
                              onClick={() => {
                                setShowSuc(!showSuc);
                                setCurrObj({
                                  contactNo: user.whatsappNo,
                                  customerName: user.customerName,
                                  address: user.address,
                                  items: [],
                                  price: 0,
                                  id: user._id,
                                });
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
                          </td> : null}
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
              />
            )}
            {billShow && (
              <BillModal
                billShow={billShow}
                setBillShow={setBillShow}
                total={total}
                currObj={currObj}
                handledelete={handledelete}
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
        </div>
      </div>
    </div>
  );
};

export default SheduledDelivery;
