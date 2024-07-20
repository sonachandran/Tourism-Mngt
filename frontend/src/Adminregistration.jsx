import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import backgroundImage from './Images/background2.jpg';
import { baseUrl } from './Url';

const Adminregistration = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        type: '',
    });
    const [showModal, setShowModal] = useState(true);
    const [showCloseText, setShowCloseText] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
        setShowCloseText(true)
    }


    const fetchdata = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submitdata = async (event) => {
        event.preventDefault();
        try {
            let response = await axios.post(`${baseUrl}/adminform`, data);
            setData(response.data);
            if (response.data) {
                alert('success');
                handleCloseModal();
                navigate('/adminlogin');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed');
        }
    };

    console.log("data", data);

    return (
        <div>
             {!showModal && (
        <div  style={{ backgroundImage: `url(${backgroundImage})`,          backgroundSize: 'cover',
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />
      )}
        
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title className='heading'>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>FullName</Form.Label>
                        <Form.Control name='fullname' type='text' placeholder="fullname" onChange={fetchdata} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control placeholder="Username" name='username' type='text' onChange={fetchdata} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' type='email' placeholder="email" onChange={fetchdata} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" onChange={fetchdata} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Type</Form.Label>
                        <Form.Select defaultValue="Choose..." name='type' onChange={fetchdata}>
                            <option>Choose...</option>
                            <option>Admin</option>
                            <option>Customer</option>
                            <option>Agency</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <div className='flex pb-2 '>
                <Button className='bg' onClick={submitdata}>
                    Submit
                </Button></div>
                <div className='mt-1 pb-4 flex'>
                            <Link to='/adminlogin'>Already have an account?Login Here</Link>
                   </div>
           
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
}

export default Adminregistration;
