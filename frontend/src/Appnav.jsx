import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Container } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import './Tourism.css'

const Appnav = () => {
  return (
    <>
      <div className='appnav'>
       
        <Navbar expand="lg" className='bg-body-tertiary' style={{padding:'21px'}}>
          <Container>
            <Navbar.Brand><b style={{ fontSize: '30px',color:'black'}} className='travel'>TRAVEL</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
              <Nav style={{ gap: '30px', fontSize: '18px', padding: '15px' }}>

             <b><Link to= '/home' className='link' style={{color:'black'}}>Home</Link></b>
             <b><Link to='/registration'className='link'style={{color:'black'}}>Register</Link></b>
            
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
       
        <Outlet />
      </div>
    </>
  );
};

export default Appnav;
