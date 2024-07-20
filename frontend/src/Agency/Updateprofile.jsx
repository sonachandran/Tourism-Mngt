import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../Url';

function Updateprofile() {

  const [data, setdata] = useState('')
  const navigate = useNavigate()

  const fetchdata = (event) => {
    setdata({ ...data, [event.target.name]: event.target.value })
  }

  const submitdata = async (event) => {
    event.preventDefault();
    try {
      const userid = localStorage.getItem('id')
      let response = await axios.put(`${baseUrl}/editagencyprofile/${userid}`, data)
      console.log('response', response.data);
      setdata(response.data)
      if (response.data) {
        toast.success('updated')
      }
    }
    catch (e) {
      toast.error("error", e);
    }


  }
  console.log('bjjs', data);

  const [profile, setprofile] = useState('')
  useEffect(() => {
      agencyprofile()
  }, [])
  const agencyprofile = async (event) => {
      const userid = localStorage.getItem('id')
      console.log('userid', userid);
      let response = await axios.get(`${baseUrl}/agencyprofile/${userid}`)
      setprofile(response.data)
  }
  console.log('profiledetails:', profile);



  return (

    <div className=''>
      <h3 className='flex heading'style={{ marginTop: '30px' }}>Edit your profile</h3>
      <div className='flex'>
        <div className='box3'>
          <Form>
            <Row className="mb-2">

              <Form.Group className="mb-2" controlId="">
                <Form.Label className=''>AgencyName</Form.Label>
                <Form.Control placeholder={profile.agencyname} name='agencyname' type='text' onChange={fetchdata} />
              </Form.Group>



              <Form.Group className="mb-2" controlId="">
                <Form.Label className=''>Country</Form.Label>
                <Form.Control name='country' type='text' placeholder={profile.country} onChange={fetchdata} />
              </Form.Group>



              <Form.Group className="mb-2" controlId="">
                <Form.Label className=''>City</Form.Label>
                <Form.Control name='city' type='text' placeholder={profile.city} onChange={fetchdata} />
              </Form.Group>




              <Row className="mb-2">
                <Form.Group as={Col} controlId="">
                  <Form.Label className=''>State</Form.Label>
                  <Form.Control name='state' type='text' placeholder={profile.state} onChange={fetchdata} />
                </Form.Group>

                <Form.Group as={Col} controlId="">
                  <Form.Label className=''>Type</Form.Label>
                  <Form.Select defaultValue="Choose..." name='type' onChange={fetchdata} placeholder={profile.type}>
                    <option>Choose...</option>
                    <option>Admin</option>
                    <option>Customer</option>
                    <option>Agency</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className=''>Phone</Form.Label>
                  <Form.Control type="number" name='phone' placeholder={profile.phone} onChange={fetchdata} />
                </Form.Group>


              </Row>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className=''>Email</Form.Label>
                <Form.Control type="email" name='email' placeholder={profile.email} onChange={fetchdata} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className=''>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder={profile.password} onChange={fetchdata} />
              </Form.Group>


            </Row>


            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" className='' label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit" className='element bg' onClick={submitdata}>
              Submit
            </Button>

          </Form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Updateprofile;