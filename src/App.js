import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./Components/Header";
import Pickups from "./Components/Pickups";
import CustomerDetails from "./Components/CustomerDetails";
import Plant from "./Components/Plant";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import BillCart from "./Components/BillCart";
import Protected from "./Components/Protected";
import AddUser from "./Components/AddUser";
import UserListing from "./Components/UserListing";
import AboutUser from "./Components/AboutUser";
import Login from "./Components/Login";
import useAuth from "./hooks/useAuth";
import RequireAuth from "./Components/RequireAuth";
import Unauthorized from "./Components/Unauthorized";
import { useEffect } from "react";
import useRefreshToken from "./hooks/useRefreshToken";
import { getProfile } from "./utills/Api";
import CustomLoader from "./Components/CustomLoader";
import OrderMain from "./Components/OrderMain";
import Deliveries from "./Components/Riderpages/Deliveries";
import ManagerOrders from "./Components/PlantManagerPages/ManagerOrders";
import PlantUsers from "./Components/PlantUsers";
import PickupRiderAllocation from "./Components/PlantManagerPages/PickupRiderAllocation";
import CurrentLocation from "./Components/CurrentLoc";

const App = () => {
  const { setAuth, auth, isLoader, setisLoader } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getProfile(setAuth, setisLoader, navigate);
  }, []);

  const refresh = useRefreshToken();
  const { currObj } = useAuth();
  if (isLoader) {
    return <CustomLoader />;
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/pickups" element={<Pickups />} />
          <Route path="/order" element={<OrderMain />} />
          <Route path="/customerdetails" element={<CustomerDetails />} />
          <Route path="/plant" element={<Plant />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/userlisting" element={<UserListing />} />
          <Route path="/plantuser" element={<PlantUsers />} />
          <Route path="/aboutuser" element={<AboutUser />} />
          <Route path="/currentloc" element={<CurrentLocation />} />
          <Route
            path="/Product-Bill"
            element={
              <Protected currObj={currObj}>
                <BillCart />
              </Protected>
            }
          />
        </Route>
        <Route element={<RequireAuth allowedRoles={["rider"]} />}>
          <Route path="/rider/pickups" element={<Pickups />} />
          <Route path="/rider/order" element={<OrderMain />} />
          <Route path="/rider/aboutuser" element={<AboutUser />} />
          <Route path="/rider/deliveries" element={<Deliveries />} />
          <Route path="/rider/aboutuser" element={<AboutUser />} />
          <Route
            path="/rider/Product-Bill"
            element={
              <Protected currObj={currObj}>
                <BillCart />
              </Protected>
            }
          />
        </Route>
        <Route element={<RequireAuth allowedRoles={["plant-manager"]} />}>
          <Route path="/plantmanager/order" element={<ManagerOrders />} />
          <Route path="/plantmanager/aboutuser" element={<AboutUser />} />
          <Route
            path="/plantmanager/pickupAllocation"
            element={<PickupRiderAllocation />}
          />
        </Route>
      </Routes>
    </>
  );
};
export default App;
