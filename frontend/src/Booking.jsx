import React from 'react'
import booking from './booking.png'
import { Form } from 'react-bootstrap'
import { ToastContainer} from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Booking = () => {
   const submitdata = () => {
   
        toast.success("Please register");
    
};
  return (
    <>
      <div className=' container '>
        <div className='row'>
          <div className='col ' style={{marginTop:'80px'}}>
          <img src={booking} alt="" className=' img-fluid ' style={{width:'600px'}} />
          </div>

          <div className='col'>
                
          <h2 className='heading mt-4'>Book Here</h2>
          <Form className='mt-5'>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label><b>Destination</b></Form.Label>
                <Form.Select defaultValue="Choose..." name='destination'>
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
                <Form.Label><b>Howmany</b></Form.Label>
                <Form.Control type="number" name='howmany' placeholder="Howmany" />
              </Form.Group>

              <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label><b>Arrivals</b></Form.Label>
                <Form.Control type="date" name='arrivals' placeholder="Arrivals" />
              </Form.Group>

              <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label><b>Leaving</b></Form.Label>
                <Form.Control type="date" name='leaving' placeholder="Leaving" />
              </Form.Group>

              

              <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label><b>DATE OF BIRTH</b></Form.Label>
                <Form.Control type="date" name='dob' placeholder="dob"/>
              </Form.Group>

              <div className='flex'>
                <button className='btn bg' onClick={submitdata}>Submit</button>
              </div>
              

            </Form>
                     
          </div>
        
        </div>

      </div>
      
      <ToastContainer/>
    </>
    

  )
}

export default Booking