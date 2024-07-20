import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from './Images/background2.jpg';
import { baseUrl } from './Url';

const Agencylogin = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [showModal, setShowModal] = useState(true);
    const [showCloseText, setShowCloseText] = useState(false);


    const handleCloseModal = () => {
        
        setShowCloseText(true)
        setShowModal(false);}

    const fetchdata = (event) => {
        setLogin({ ...login, [event.target.name]: event.target.value });
    };

    const submitdata = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${baseUrl}/agencylogin`, login);
            console.log("response", response.data.agency);
            setLogin(response.data.agency);
            const agency = response.data.agency;

            if (!agency.verified) {
                alert('Your account has not been approved by an admin yet');
                return;
            }

            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('id', response.data.agency._id);

            const usertype = response.data.agency.type;
            console.log("usertype", usertype);

            if (usertype) {
                if (usertype === 'Admin') {
                    navigate('/admin');
                } else if (usertype === 'Customer') {
                    navigate('/customer');
                } else {
                    navigate('/agency');
                }
            }
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div>
             {!showModal && (
        <div  style={{ backgroundImage: `url(${backgroundImage})`, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1,          backgroundSize: 'cover',
    }} />
      )}
       
        <Modal show={showModal} onHide={handleCloseModal} centered >
            <Modal.Header closeButton >
                <Modal.Title className='heading'>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' placeholder="name@example.com" onChange={fetchdata} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="password" onChange={fetchdata} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            
                <div className='flex pb-4'>
                <Button className='bg ' onClick={submitdata}>
                    Submit
                </Button></div>
            
        </Modal>


        {!showModal && showCloseText && (
        <>
        <div className='flex'>
          <div style={{color:'white',letterSpacing:'2px',marginTop:'180px' ,fontSize:'1px'}}>
          <b style={{paddingLeft:'160px',fontSize:'23px',lineHeight:'45px'}}>Travel makes one modest <br /> You see what a tiny place you occupy in the world..</b>
         </div>
        
        </div>

        <div className='flex '>
        <button  style={{backgroundColor:'green'
        ,marginTop:'30px',
        width:'150px',
        color:"white",
        border:'none',
        height:'40px'}}><Link to='/registration' className='link' style={{color:'white'}}><i>Register</i></Link></button>
        </div>
        </>
        
      )}

        </div>
    );
};

export default Agencylogin;
