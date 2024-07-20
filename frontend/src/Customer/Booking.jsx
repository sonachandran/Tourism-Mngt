

import React, { useState } from 'react';
import booking from '../Images/booking.png';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import { toast } from 'react-toastify';
import { baseUrl } from '../Url';


const Booking = () => {
  const [data, setdata] = useState('');

  const fetchdata = (event) => {
    const { name, value } = event.target;
    const formattedValue = name === 'arrivals' || name === 'leaving'  ? formatDate(value) : value;
    setdata({ ...data, [name]: formattedValue });
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const submitdata = async (event) => {
    event.preventDefault();
    try {
      const id = localStorage.getItem('id');
      const response = await axios.post(`${baseUrl}/booking`, { ...data, userid: id });
      console.log("response", response.data);
      setdata(response.data);
      if (response.data) {
        // alert('Booked');      
          toast.success('Booked'); // Use toast.success for success message

      }
    } catch (error) {
      toast.error('Error submitting data:', error);
    }
  };

  console.log("booking details", data);

  return (
    <div className='flex'>
       <ToastContainer />
     
        

          <div className=''>
            <h2 className='heading mt-5 ms-4 '>Book Here</h2>
            <Form className=''style={{ width: '400px', padding: '40px',backgroundColor:'white', borderRadius: '8px' }}>
              <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label><b>Destination</b></Form.Label>
                <Form.Select defaultValue="Choose..." name='destination' onChange={fetchdata}>
                  <option>Choose...</option>
                  <option>Hyderabad</option>
                  <option>Manali</option>
                  <option>Delhi</option>
                  <option>Paris</option>
                  <option>Munnar</option>
                  <option>Kashmir</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label><b>How Many</b></Form.Label>
                <Form.Control type="number" name='howmany' placeholder="How many" onChange={fetchdata} />
              </Form.Group>

              <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label><b>Arrivals</b></Form.Label>
                <Form.Control type="date" name='arrivals' placeholder="Arrivals" onChange={fetchdata} />
              </Form.Group>

              <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label><b>Leaving</b></Form.Label>
                <Form.Control type="date" name='leaving' placeholder="Leaving" onChange={fetchdata} />
                 {/* Display the formatted date */}
                 {data.dob && (
                  <p>{formatDate(data.dob)}</p>
                )}
              </Form.Group>

              {/* <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label><b>Date of Birth</b></Form.Label>
                <Form.Control type="date" name='dob' placeholder="dob" onChange={fetchdata} />
               
              </Form.Group> */}

              <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label><b>Accommodation</b></Form.Label>
                <Form.Select defaultValue="Choose..." name='accommodation' onChange={fetchdata}>
                  <option>Choose...</option>
                  <option>Hotels</option>
                  <option>Resorts</option>
                  <option>guesthouses</option>
                  <option>vacation rentals</option>
                 
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label><b>Transportation</b></Form.Label>
                <Form.Select defaultValue="Choose..." name='transportation' onChange={fetchdata}>
                  <option>Choose...</option>
                  <option>Buses</option>
                  <option>Flights</option>
                  <option>Trains</option>
                  <option>Rental cars</option>
                 
                </Form.Select>
              </Form.Group>


             
              

              <div className='flex'>
                <button className='btn ' onClick={submitdata}>Submit</button>
              </div>
            </Form>
          </div>
        </div>
    // </div>
  );
};

export default Booking;

