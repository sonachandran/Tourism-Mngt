
// import axios from 'axios';
// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [loginData, setLoginData] = useState({ email: '', password: '' });

//   const handleChange = (event) => {
//     setLoginData({ ...loginData, [event.target.name]: event.target.value })

//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

    
//     try {
//       const response = await axios.post('http://localhost:7000/login', loginData);
//       const { user, token } = response.data;

//       // Check if the user's account has been approved by an admin
//       if (!user.verified) {
//         alert('Your account has not been approved by an admin yet');
//         return;
//       }

//       localStorage.setItem('token', token);
//       localStorage.setItem('id', user._id);

      
//       if (user.type === 'Admin') {
//         navigate('/admin');
//       } else if (user.type === 'Customer') {
//         navigate('/customer');
//       } else {
//         navigate('/agency');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Login failed. Please try again.');
//     }
//   };

  

//   return (
//     <div>
//       <h2 className='flex heading'><b style={{ marginTop: '50px' }}>Login</b></h2>
//       <div className='flex'>
//         <div className='box2'>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" name="email" value={loginData.email} onChange={handleChange} placeholder="name@example.com" />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="password" />
//             </Form.Group>
//             <div className='flex'>
//               <button className='btn mt-3 bg' type="submit"><b>Submit</b></button>
//             </div>
//           </Form>
//           <div className='mt-1 flex'>
//             <a href="/cusregistration">Don't have an account? Register here.</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from './Images/background2.jpg';
import { baseUrl } from './Url';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showModal, setShowModal] = useState(true);
  const [showCloseText, setShowCloseText] = useState(false);


  const handleCloseModal = () =>{
     setShowModal(false);
     setShowCloseText(true)
    }

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/login`, loginData);
      const { user, token } = response.data;

      // Check if the user's account has been approved by an admin
      if (!user.verified) {
        alert('Your account has not been approved by an admin yet');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('id', user._id);

      if (user.type === 'Admin') {
        navigate('/admin');
      } else if (user.type === 'Customer') {
        navigate('/customer');
      } else {
        navigate('/agency');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div>
       {!showModal && (
        <div  style={{ backgroundImage: `url(${backgroundImage})`, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 ,backgroundSize:'cover'}} />
      )}
      <Modal show={showModal} onHide={handleCloseModal} style={{ marginTop:'170px'}}>
        <Modal.Header  closeButton  style={{ border: 'none',marginTop:'170'}}>
          <Modal.Title className='heading'>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '20px' }} >
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={loginData.email} onChange={handleChange} placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="password" />
            </Form.Group>
            <Button  type="submit" className='bg'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        
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

export default Login;







