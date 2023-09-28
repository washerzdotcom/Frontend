import './App.css';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Pickups from './Components/Pickups';
import Order from './Components/Order';
import CustomerDetails from './Components/CustomerDetails';
import Plant from './Components/Plant';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './Components/Profile';
import "./style/profile.scss"




const App =() =>
(
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pickups' element={<Pickups/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/customerdetails' element={<CustomerDetails/>}/>
          <Route path='/plant' element={<Plant/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </>
)
export default App;
