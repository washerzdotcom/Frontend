import './App.css';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Pickups from './Components/Pickups';
import Order from './Components/Order';
import CustomerDetails from './Components/CustomerDetails';
import Plant from './Components/Plant';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { AppContext } from './utills/context';
import BillCart from './Components/BillCart';
import Protected from './Components/Protected';


const App =() =>
{
  const [currObj, setCurrObj] = useState({
    contactNo: "",
    customerName: "",
    address: "",
    items: [],
    price: 0,
    id: "",
  }); 
    return <>
    <AppContext.Provider value={{ currObj, setCurrObj }}>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pickups' element={<Pickups/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/customerdetails' element={<CustomerDetails/>}/>
          <Route path='/plant' element={<Plant/>}/>
          <Route path='/Product-Bill' element={
          <Protected currObj={currObj}>
          <BillCart/>
        </Protected>
          }/>
        </Routes>
      </Router>
      </AppContext.Provider>
    </>
}
export default App;
