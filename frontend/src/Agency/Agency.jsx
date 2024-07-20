import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Agency = () => {
  const navigate=useNavigate()
  const logout = () => {
 
    localStorage.clear();
    navigate('/Agencylogin');
    
};

  return (
   <>
   
<div className='appnav'>
        <Navbar expand="lg" className="bgnav" style={{padding:'20px'}}>
          <Container>
            <Navbar.Brand><b style={{ fontSize: '30px',color:'black' }} className=' travel '>Travel</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className=' flex justify-content-end '>              
            <Nav style={{ gap: '50px', fontSize: '18px', padding: '15px' }}>
             <b><Link to= 'addpackages' className='link ' style={{color:'black'}}>AddPackages</Link></b>
             <b><Link to= 'viewpackage' className='link ' style={{color:'black'}}>Packages</Link></b>
             <b><Link to='viewbooking'className='link' style={{color:'black'}}>Bookings </Link></b>             
             <b><Link to='agencyprofile'className='link' style={{color:'black'}}>Profile</Link></b>
             <b><Link to='day1'className='link' style={{color:'black'}}>AddDetails</Link></b>


             <button onClick={logout} style={{width:'85px'}} className='text logout'>LOGOUT</button>

             
            
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </div>
   </>
  )
}

export default Agency