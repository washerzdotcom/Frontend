import React, { useState } from "react";
import { useEffect } from "react";
import { instance } from "../config";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";
import Loader from "./Loader";
import "../style/responsive.css"
import useRefreshToken from "../hooks/useRefreshToken";

const CustomerDetails = () => {
  const [customer, setCustomer] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 8;
  const refresh = useRefreshToken();

  const getCustomer = async () => {
    setIsLoading(true);
    const newAccessToken = await refresh();
    console.log("=============================>>> at", newAccessToken)
    try {
      const customerData = await instance.get(
        `/getContacts?pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      setPageCount(Math.ceil(customerData?.data?.link.total / pageSize));
      setCustomer([
        ...customerData.data.contact_list.sort(
          (a, b) =>
            b.lastUpdated.localeCompare(a.lastUpdated) ||
            a.lastUpdated.localeCompare(b.lastUpdated)
        ),
      ]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    getCustomer();
  }, [pageNumber]);

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1);
  };

  return (
    <>
      <div className="p-3 p-md-5">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "20px",
            fontSize: "24px", // Adjust font size for smaller screens
            textAlign: "center", // Center align for smaller screens
          }}
        >
          Customers
        </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Added on</th>
            </tr>
          </thead>
          <tbody>
            {customer.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.phone}</td>
                <td>
                  {user.customParams.find((el) => el.name === "address")
                    ?.value ?? "-"}
                </td>
                <td>
                  {moment(user.lastUpdated).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
    </>
  );
};

export default CustomerDetails;
