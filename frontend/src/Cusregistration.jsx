// import React, { useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import backgroundImage from './Images/background2.jpg'; // Import the background image

// const Cusregistration = () => {
//   const [showModal, setShowModal] = useState(true);
//   const [data, setData] = useState({});
//   const [passwordError, setPasswordError] = useState('');
//   const navigate = useNavigate();

//   const handleCloseModal = () => setShowModal(false);

//   const fetchdata = (event) => {
//     const { name, value } = event.target;
//     setData({ ...data, [name]: value });

//     if (name === 'password' && value.length < 6) {
//       setPasswordError('Password must be at least 6 characters long.');
//     } else {
//       setPasswordError('');
//     }
//   };

//   const submitdata = async (event) => {
//     event.preventDefault();

//     if (data.password.length < 6) {
//       toast.error('Password must be at least 6 characters long');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:7000/insert', data);
//       if (response.data) {
//         toast.success('Registration successful');
//         navigate('/login');
//       }
//     } catch (error) {
//       console.error('Error occurred:', error);
//       toast.error('Registration failed. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       {/* Background image */}
//       {!showModal && (
//         <div style={{
          
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: 'cover',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           zIndex: -1
//         }} 
            
//         />
        
//       )}


//       {/* Modal */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title className='heading'>Register</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form >
//             <Row className="mb-2">
//               <Form.Group as={Col} controlId="firstName">
//                 <Form.Label>First Name</Form.Label>
//                 <Form.Control type="text" name="firstname" placeholder="First Name" onChange={fetchdata} />
//               </Form.Group>

//               <Form.Group as={Col} controlId="lastName">
//                 <Form.Label>Last Name</Form.Label>
//                 <Form.Control type="text" name="lastname" placeholder="Last Name" onChange={fetchdata} />
//               </Form.Group>
//             </Row>

//             <Form.Group className="mb-2" controlId="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" name="email" placeholder="Email" onChange={fetchdata} />
//             </Form.Group>

//             <Form.Group className="mb-2" controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" name="password" placeholder="Password" onChange={fetchdata} />
//               {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
//             </Form.Group>

//             <Form.Group className="mb-2" controlId="type">
//               <Form.Label>Type</Form.Label>
//               <Form.Select defaultValue="Choose..." name="type" onChange={fetchdata}>
//                 <option>Choose...</option>
//                 <option>Admin</option>
//                 <option>Customer</option>
//                 <option>Agency</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-2" controlId="city">
//               <Form.Label>City</Form.Label>
//               <Form.Control type="text" name="city" placeholder="City" onChange={fetchdata} />
//             </Form.Group>

//             <Form.Group className="mb-2" controlId="formBasicCheckbox">
//               <Form.Check type="checkbox" label="Check me out" />
//             </Form.Group>

//             <div className="d-grid ">
//               <Button className='bg' type="submit" onClick={submitdata}>
//                 Submit
//               </Button>

//             </div>
//             <div className="mt-2 text-center">
//               <Link to="/login">Already have an account? Login here</Link>
//             </div>
//           </Form>
//         </Modal.Body>
//         <ToastContainer />
//       </Modal>
//     </div>
//   );
// };

// export default Cusregistration


import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import backgroundImage from './Images/background2.jpg'; // Import the background image

const Cusregistration = () => {
  const [showModal, setShowModal] = useState(true);
  const [data, setData] = useState({});
  const [passwordError, setPasswordError] = useState('');
  const [showCloseText, setShowCloseText] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    setShowCloseText(true);
  };

  const fetchdata = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });

    if (name === 'password' && value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const submitdata = async (event) => {
    event.preventDefault();

    if (data.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      event.target.disabled = true;

      const response = await axios.post('http://localhost:7000/insert', data);
      if (response.data) {
        toast.success('Registration successful');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Registration failed. Please try again later.');
    }
  };

  return (
    <div>
      {/* Background image */}
      {!showModal && (
        <div style={{
          
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }} />
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className='heading'>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstname" placeholder="First Name" onChange={fetchdata} />
              </Form.Group>

              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastname" placeholder="Last Name" onChange={fetchdata} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Email" onChange={fetchdata} />
            </Form.Group>

            <Form.Group className="mb-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onChange={fetchdata} />
              {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-2" controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Select defaultValue="Choose..." name="type" onChange={fetchdata}>
                <option>Choose...</option>
                <option>Admin</option>
                <option>Customer</option>
                <option>Agency</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" placeholder="City" onChange={fetchdata} />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <div className="d-grid ">
              <Button className='bg' type="submit" onClick={submitdata}>
                Submit
              </Button>
            </div>
            <div className="mt-2 text-center">
              <Link to="/login">Already have an account? Login here</Link>
            </div>
          </Form>
        </Modal.Body>
        <ToastContainer />
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

export default Cusregistration;




