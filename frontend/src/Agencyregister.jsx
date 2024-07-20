import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import backgroundImage from './Images/background2.jpg';
import { baseUrl } from './Url';

function Agencyregister() {
  const navigate = useNavigate();
  const [data, setdata] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [showCloseText, setShowCloseText] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowCloseText(true)
  }


  const fetchdata = (event) => {
    const { name, value } = event.target;
    setdata({ ...data, [name]: value });

    // Password validation: at least 6 characters
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
      const response = await axios.post(`${baseUrl}/agencyform`, data);
      console.log('response', response.data);
      if (response.data) {
        toast.success('Registration success');
        handleCloseModal();
        navigate('/agencylogin');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Registration failed. Please try again later.');
    }
  };
  

  return (
    <div>
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

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className='heading'>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="">
              <Form.Group className="mb-2" controlId="">
                <Form.Label className=''>AgencyName</Form.Label>
                <Form.Control placeholder="agencyname" name='agencyname' type='text' onChange={fetchdata} />
              </Form.Group>

              <Form.Group className="mb-2" controlId="">
                <Form.Label className=''>Country</Form.Label>
                <Form.Control name='country' type='text' placeholder="country" onChange={fetchdata} />
              </Form.Group>

              <Form.Group className="mb-2" controlId="">
                <Form.Label className=''>City</Form.Label>
                <Form.Control name='city' type='text' placeholder="city" onChange={fetchdata} />
              </Form.Group>

              <Row className="mb-2">
                <Form.Group as={Col} controlId="">
                  <Form.Label className=''>State</Form.Label>
                  <Form.Control name='state' type='text' placeholder='state' onChange={fetchdata} />
                </Form.Group>

                <Form.Group as={Col} controlId="">
                  <Form.Label className=''>Type</Form.Label>
                  <Form.Select defaultValue="Choose..." name='type' onChange={fetchdata}>
                    <option>Choose...</option>
                    <option>Admin</option>
                    <option>Customer</option>
                    <option>Agency</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className=''>Phone</Form.Label>
                  <Form.Control type="number" name='phone' placeholder="phone" onChange={fetchdata} />
                </Form.Group>
              </Row>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className=''>Email</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" onChange={fetchdata} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className=''>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" onChange={fetchdata} />

                {passwordError && (
                  <Form.Text className="text-danger">{passwordError}</Form.Text>
                )}
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" className='' label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit" className='bg' onClick={submitdata}>
              Submit
            </Button>
            <div className='mt-1 flex'>
              <Link to='/agencylogin'>Already have an account? Login Here</Link>
            </div>
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
      <ToastContainer />
    </div>
  );
}

export default Agencyregister;
