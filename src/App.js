import './App.css';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Pickups from './Components/Pickups';
import Order from './Components/Order';
import CustomerDetails from './Components/CustomerDetails';
import Plant from './Components/Plant';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import BillCart from './Components/BillCart';
import Protected from './Components/Protected';
import AddUser from "./Components/AddUser"
import UserListing from './Components/UserListing';
import AboutUser from './Components/AboutUser';
import Login from './Components/Login';
import useAuth from './hooks/useAuth';
import Layout from './Components/Layout';
import RequireAuth from './Components/RequireAuth';
import Unauthorized from './Components/Unauthorized';
import { useEffect } from 'react';
import useRefreshToken from './hooks/useRefreshToken';

const App =() =>
{
  const refresh =  useRefreshToken();
  const { setAuth } = useAuth();
     useEffect(()=>
     {
        (async ()=>
        {
          const response = await refresh();
           const role = response?.user?.role;
           const profile = response?.user;
           console.log("response-->> ", response)
          setAuth({ user: profile.email, pwd: profile.password, role,profile, accessToken: response.accessToken });
          }
        )()
     }, [])
    const { currObj } = useAuth();
    return <>
      <Router>
        <Header/>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/login' element={<Login/>}/>
          <Route path='/unauthorized' element={<Unauthorized/>}/>
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/pickups' element={<Pickups/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/customerdetails' element={<CustomerDetails/>}/>
          <Route path='/plant' element={<Plant/>}/>
          <Route path ='/adduser' element={<AddUser/>}/>
          <Route path ='/userlisting' element={<UserListing/>}/>
          <Route path ='/aboutuser' element={<AboutUser/>}/>
          <Route path='/Product-Bill' element={
          <Protected currObj={currObj}>
          <BillCart/>
        </Protected>
          }/>
          </Route>
          </Route>
        </Routes>
      </Router>
    </>
}
export default App;
