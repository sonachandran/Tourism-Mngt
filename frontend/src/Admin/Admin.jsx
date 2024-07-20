import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

const Admin = () => {
  return (
 <>

<div className='appnav'>
        <Navbar expand="lg" className="bgnav appnav" style={{padding:'20px'}}>
          <Container>
            <Navbar.Brand><b style={{ fontSize: '30px',color:'black' }} className=' travel '>TRAVEL</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className=' flex justify-content-end '>              
            <Nav style={{ gap: '50px', fontSize: '18px', padding: '15px' }}>

             <b><Link to= 'bookings' className='link'style={{color:'black' }}>Bookings</Link></b>
             <b><Link to='packageview'className='link'style={{color:'black' }}>Packages</Link></b>
             <b><Link to='viewreviews'className='link'style={{color:'black' }}>Reviews</Link></b>
             <b><Link to='admininterface'className='link'style={{color:'black' }}>Users</Link></b>
             <b><Link to='agencyinterface'className='link'style={{color:'black' }}>Agencies</Link></b>

            
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </div>
 </>
  )
}

export default Admin