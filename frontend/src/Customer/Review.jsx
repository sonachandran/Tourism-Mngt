import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer} from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../Url';

function Review() {
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [data, setData] = useState({
    name: '',
    feedback: ''
  });

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const fetchdata = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const fetchimage = (event) => {
    setImage(event.target.files[0]);
  }

  const submitdata = async (event) => {
    event.preventDefault();
    const userid = localStorage.getItem('id');
    
    let newdata = new FormData();
    newdata.append('image', image);
    newdata.append('name', data.name);
    newdata.append('feedback', data.feedback);
    newdata.append('rating', rating);
    newdata.append('userid', userid);
    
    try {
      let response = await axios.post(`${baseUrl}/addreview`, newdata);
      console.log('response', response);
      toast.success('Success');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
    }
  }

  return (
    <div className='flex'>
      <div className='box2'>
        <h2>Feedback and Reviews</h2>
        <Form onSubmit={submitdata}>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name='name' placeholder="Name" onChange={fetchdata} />
          </Form.Group>

          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" name='image' onChange={fetchimage} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comments/Feedback</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={fetchdata} name='feedback' />
          </Form.Group>

          <div>
            {[...Array(5)].map((_, index) => (
              <span key={index} onClick={() => handleRatingChange(index + 1)} style={{ fontSize: '35px' }}>
                {index + 1 <= rating ? '★' : '☆'}
              </span>
            ))}
          </div>

          <button type="submit">Submit Feedback</button>
        </Form>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Review;
