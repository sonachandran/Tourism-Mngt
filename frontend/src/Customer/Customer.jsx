import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { RiAccountCircleFill } from "react-icons/ri";


const Customer = () => {
  const navigate=useNavigate()
  const logout = () => {
 
    localStorage.removeItem('token');
    navigate('/login');
    
};
  return (
    < div >

    
    <div>
      
        <Navbar expand="lg" className='bgnav  sticky-top' style={{padding :'13px'}}>
          <Container >
            <Navbar.Brand><b style={{ fontSize: '30px',color:'black' }} className='travel'>TRAVEL</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className=' flex justify-content-end ' >              
            <Nav style={{ gap: '50px', fontSize: '18px', padding: '15px' }}>
             
              <b><Link to= 'review' style={{color:'black'}} className='link ' >AddFeedback</Link></b>

             {/* <b><Link to= 'booking' style={{color:'white'}} className='link '>Booking</Link></b> */}
             <b><Link to='viewpackages'className='link' style={{color:'black'}}>Packages</Link></b>
             <b><Link to='viewreview'className='link' style={{color:'black'}}>Reviews</Link></b>

             <b><Link to='profile'className='link ' style={{color:'black'}}><RiAccountCircleFill style={{fontSize:'40px'}} /></Link></b>
             <button onClick={logout} style={{width:'85px'}} className='text logout'>LOGOUT</button>

             
          
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </div>
    </div>
   
  )
}

export default Customer