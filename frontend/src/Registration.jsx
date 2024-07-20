
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [data, setdata] = useState('')
  const navigate = useNavigate()

  const fetchdata = (event) => {
    setdata({ ...data, [event.target.name]: event.target.value })
  }

  const submitdata = async (event) => {
    event.preventDefault();
  
    if (data.type === 'Admin') {
         
      navigate('/adminregistration');

    }
     else if (data.type === 'Customer') {
      
      navigate('/cusregistration');
    }
     else if (data.type === 'Agency') {
      navigate('/agencyregistration');
      
    }
     else {
     
      alert('Please select a valid user type.');
    }
  }
   
  return (
    <div className='back'>
      <h2 className='flex  '><i style={{marginTop:'140px',color:'white'}}>Register</i></h2>
      <div className='flex'>
        < div className='box'>

          <Form>
            
            
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label className='' style={{color:'white'}}>Type</Form.Label>
                <Form.Select defaultValue="Choose..." name='type' onChange={fetchdata}>
                  <option>choose.....</option>
                  <option>Admin</option>
                  <option>Customer</option>
                  <option>Agency</option>
                </Form.Select>
              </Form.Group>
            <div className='flex'>
              <button className='btn mt-3' onClick={submitdata}><b>Submit</b></button>
            </div>
          </Form>

        </div>
      </div>
    </div>
  )
}

export default Registration