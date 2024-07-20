// import axios from 'axios';
// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import backgroundImage from './Images/background2.jpg';
// import { baseUrl } from './Url';

// const Adminlogin = () => {
//     const navigate = useNavigate();
//     const [data, setData] = useState({ email: '', password: '' });
//     const [showModal, setShowModal] = useState(true);
//     const [showCloseText, setShowCloseText] = useState(false);


//     const handleCloseModal = () => {
//      setShowModal(false);
//      setShowCloseText(true)
//     }
//     const fetchdata = (event) => {
//         setData({ ...data, [event.target.name]: event.target.value });
//     };

//     const submitbutton = async (event) => {
//         event.preventDefault();
//         try {
//             let response = await axios.post(`${baseUrl}/adminlogin`, data);
//             setData(response.data.admin);

//             const usertype = response.data.admin.type;

//             if (usertype) {
//                 if (usertype === 'Admin') {
//                     navigate('/admin');
//                 } else if (usertype === 'Customer') {
//                     navigate('/customer');
//                 } else {
//                     navigate('/agency');
//                 }
//             }
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     return (
//         <div>
//         {!showModal && (
//             <div  style={{ backgroundImage: `url(${backgroundImage})`, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1,          backgroundSize: 'cover',
//         }} />
//           )}
//         <Modal show={showModal} onHide={handleCloseModal} centered>
//             <Modal.Header  closeButton>
//                 <Modal.Title className='heading'>Login</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group className="mb-3" controlId="formBasicEmail">
//                         <Form.Label>Email address</Form.Label>
//                         <Form.Control type="email" name="email" placeholder="Enter email" onChange={fetchdata} />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formBasicPassword">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control type="password" name="password" placeholder="Password" onChange={fetchdata} />
//                     </Form.Group>

//                     <Button className='bg' type="submit" onClick={submitbutton}>
//                         Submit
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>


//        {!showModal && showCloseText && (
//         <>
//         <div className='flex'>
//           <div style={{color:'white',letterSpacing:'2px',marginTop:'180px' ,fontSize:'1px'}}>
//           <b style={{paddingLeft:'160px',fontSize:'23px',lineHeight:'45px'}}>Travel makes one modest <br /> You see what a tiny place you occupy in the world..</b>
//          </div>
        
//         </div>

//         <div className='flex '>
//         <button  style={{backgroundColor:'green'
//         ,marginTop:'30px',
//         width:'150px',
//         color:"white",
//         border:'none',
//         height:'40px'}}><Link to='/registration' className='link' style={{color:'white'}}><i>Register</i></Link></button>
//         </div>
//         </>
        
//       )}


//         </div>
//     );
// };

// export default Adminlogin;



import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from './Images/background2.jpg';
import { baseUrl } from './Url';  // Ensure this import path is correct

const Adminlogin = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: '', password: '' });
    const [showModal, setShowModal] = useState(true);
    const [showCloseText, setShowCloseText] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
        setShowCloseText(true);
    }

    const fetchdata = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submitbutton = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/adminlogin`, data);
            const admin = response.data.admin;
            setData(admin);

            const usertype = admin.type;

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
            console.error("Error:", error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div>
            {!showModal && (
                <div style={{ 
                    backgroundImage: `url(${backgroundImage})`, 
                    position: 'fixed', top: 0, left: 0, 
                    width: '100%', height: '100%', zIndex: -1, 
                    backgroundSize: 'cover' 
                }} />
            )}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='heading'>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitbutton}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={fetchdata} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={fetchdata} />
                        </Form.Group>

                        <Button className='bg' type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {!showModal && showCloseText && (
                <>
                    <div className='flex'>
                        <div style={{ color: 'white', letterSpacing: '2px', marginTop: '180px', fontSize: '1px' }}>
                            <b style={{ paddingLeft: '160px', fontSize: '23px', lineHeight: '45px' }}>
                                Travel makes one modest <br /> You see what a tiny place you occupy in the world..
                            </b>
                        </div>
                    </div>

                    <div className='flex '>
                        <button style={{
                            backgroundColor: 'green',
                            marginTop: '30px',
                            width: '150px',
                            color: "white",
                            border: 'none',
                            height: '40px'
                        }}>
                            <Link to='/registration' className='link' style={{ color: 'white' }}>
                                <i>Register</i>
                            </Link>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Adminlogin;
