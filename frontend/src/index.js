import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Appnav from './Appnav';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Registration from './Registration';
import './Tourism.css'
import Login from './Login';
import About from './About';
import Services from './Services';
import Customer from './Customer/Customer';
import Admin from './Admin/Admin';
import Agency from './Agency/Agency';
import Packages from './Agency/Addpackages';
import Booking from './Customer/Booking';
import Customerhome from './Customer/Customerhome';
import Profile from './Customer/Profile';
import Editprofile from './Customer/Editprofile';
import Viewbookings from './Customer/Viewbookings';
import Addpackages from './Agency/Addpackages';
import Viewpackages from './Customer/Viewpackages';
import Viewpackage from './Agency/Viewpackage';
import Agencyhome from './Agency/Agencyhome';
import Updatepackage from './Agency/Updatepackage';
import Viewbooking from './Agency/Viewbooking';
import Cusregistration from './Cusregistration';
import Agencyregister from './Agencyregister';
import Agencylogin from './Agencylogin';
import Agencyprofile from './Agency/Agencyprofile';
import Updateprofile from './Agency/Updateprofile';
import Packagedetailss from './Agency/Packagedetailss';
import Detailpackage from './Customer/Detailpackage';

import Footer from './Footer';
import Adminregistration from './Adminregistration';
import Adminlogin from './Adminlogin';
import Adminhome from './Admin/Adminhome';
import Bookings from './Admin/Bookings';
import Review from './Customer/Review';
import Admininterface from './Admin/Admininterface';
import Agencyinterface from './Admin/Agencyinterface';
import Viewreviews from './Admin/Viewreviews';
import Packagedetails from './Admin/Packagedetails';
import Packageview from './Admin/Packageview';
import Viewbookings2 from './Agency/Viewbookings2';
import Viewbookings3 from './Agency/Viewbookings3';
import Bookings2 from './Admin/Bookings2';
import Bookings3 from './Admin/Booking3';
import Viewreview from './Customer/Viewreview';
import Day1 from './Agency/Day1';
import Viewdetails from './Customer/Viewdetails';
import Detailpackagess from './Detailpackagess';
import Destinations from './Destinations';
import Viewdetailss from './Agency/Viewdetailss';
import Viewdetailsss from './Admin/Viewdetailsss';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>



      <Routes>
        <Route path="/" element={<Appnav />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/detailpackagess/:id" element={<Detailpackagess />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="cusregistration" element={<Cusregistration/>} />
          <Route path="/login" element={<Login />} />
          <Route path="agencyregistration" element={<Agencyregister/>} />
          <Route path="/agencylogin" element={<Agencylogin />} />
          <Route path='adminregistration' element={<Adminregistration/>}/>
          <Route path='adminlogin' element={<Adminlogin/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />}/>
          <Route path="/packages" element={<Packages />}/>
          <Route path="/footer" element={<Footer/>} />
          <Route path="viewdetails" element={<Viewdetails />} />


        </Route>

        <Route path="/admin/*" element={<Admin />}>
          <Route index element={<Adminhome/>}></Route>
          <Route path="bookings" element={<Bookings/>} />
          <Route path="bookings2" element={<Bookings2/>} />
          <Route path="bookings3" element={<Bookings3/>} />
          <Route path="viewreviews" element={<Viewreviews/>} />
          <Route path="packageview" element={<Packageview/>} />
          <Route path="packagedetails/:id" element={<Packagedetails/>} />
          <Route path="admininterface" element={<Admininterface/>}/>
          <Route path="agencyinterface" element={<Agencyinterface/>}/> 
          <Route path="viewdetailsss" element={<Viewdetailsss />} />
       
        </Route>

        <Route path="/customer/*" element={<Customer />}>
          <Route index element={<Customerhome />} />
         
          <Route path="customerhome" element={<Customerhome />} />
          <Route path="booking" element={<Booking />} />
          <Route path="profile" element={<Profile />} />
          <Route path="editprofile" element={<Editprofile />} />
          <Route path="viewbookings" element={<Viewbookings />} />
          <Route path="viewpackages" element={<Viewpackages />} />        
          <Route path="detailpackage/:id" element={<Detailpackage />} />
          <Route path="review" element={<Review />} />
          <Route path="viewdetails" element={<Viewdetails />} />
          <Route path="viewreview" element={<Viewreview/>} />
          <Route path="services" element={<Services />}/>
          <Route path="footer" element={<Footer/>} />






        </Route>

        <Route path="/agency/*" element={<Agency />}>
          <Route index element={<Agencyhome />} />
          <Route path="agencyhome" element={<Agencyhome />} />
          <Route path="addpackages" element={<Addpackages />} />
          <Route path="viewpackage" element={<Viewpackage />} />
          <Route path="updatepackage/:id" element={<Updatepackage />} />
          <Route path="viewbooking" element={<Viewbooking />} />
          <Route path="viewbookings2" element={<Viewbookings2 />} />
          <Route path="viewbookings3" element={<Viewbookings3 />} />
          <Route path="agencyprofile" element={<Agencyprofile />} />
          <Route path="updateprofile" element={<Updateprofile/>} />
          <Route path="packagedetailss/:id" element={<Packagedetailss/>} />
          <Route path="day1" element={<Day1/>} />
          <Route path="viewdetailss" element={<Viewdetailss />} />

          

          
        </Route>

      </Routes>



    </BrowserRouter>

  </React.StrictMode>
);
reportWebVitals();




