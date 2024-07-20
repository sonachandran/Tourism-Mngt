import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../Url';


const Editprofile = () => {
  const [data, setdata] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    type: ''
  })
  const fetchdata = (event) => {
    setdata({ ...data, [event.target.name]: event.target.value })
  }

  const submitdata = async () => {
    try {
      const userid = localStorage.getItem('id')
      let response = await axios.put(`${baseUrl}/updateprofile/${userid}`, data)
      setdata(response.data)
      if (response.data) {
        toast.success('updated')
      }

    } catch (error) {
      toast.error('updataion failed', error)
    }
  }



  console.log('updatedata', data);


  const [profile, setprofile] = useState('')
  useEffect(() => {
    viewprofile()
  }, [])
  const viewprofile = async (event) => {
    const userid = localStorage.getItem('id')
    console.log('userid', userid);
    let response = await axios.get(`${baseUrl}/viewprofile/${userid}`)
    setprofile(response.data)
  }
  console.log('profiledetails:', profile);
  return (


    <div className=' '>
      <h3 className='flex heading ' style={{ marginTop: '30px' }}>Edit Profile</h3>
      <div className='flex'>
        <div className='box3'>
          <Form>
            <Row className="mb-2">

              <Form.Group className="mb-2" controlId="">
                <Form.Label className=''>FirstName</Form.Label>
                <Form.Control placeholder={profile.firstname} name='firstname' type='text' onChange={fetchdata} />
              </Form.Group>



              <Form.Group className="mb-2" controlId="">
                <Form.Label className=''>LastName</Form.Label>
                <Form.Control name='lastname' type='text' placeholder={profile.lastname} onChange={fetchdata} />
              </Form.Group>



              <Form.Group className="mb-2" controlId="">
                <Form.Label className=''>Email</Form.Label>
                <Form.Control name='email' type='email' placeholder={profile.email} onChange={fetchdata} />
              </Form.Group>

              <Row className="mb-2">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className=''>Password</Form.Label>
                  <Form.Control type="password" name='password' placeholder={profile.password} onChange={fetchdata} />
                </Form.Group>
                <Form.Group as={Col} controlId="">
                  <Form.Label className=''>Type</Form.Label>
                  <Form.Select placeholder={profile.type} name='type' onChange={fetchdata}>
                   
                    <option>Admin</option>
                    <option>Customer</option>
                    <option>Agency</option>
                  </Form.Select>
                </Form.Group>


              </Row>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className=''>City</Form.Label>
                <Form.Control type="text" name='city' placeholder={profile.city} onChange={fetchdata} />
              </Form.Group>




            </Row>





            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" className='element' label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit" className=' bg' onClick={submitdata}>
              Submit
            </Button>

          </Form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Editprofile