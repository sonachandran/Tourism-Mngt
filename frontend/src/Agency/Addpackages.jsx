
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../Url';

const Addpackages = () => {
  let id = localStorage.getItem('id')
  const [data, setData] = useState({
    destination: '',
    description: '',
    price: '',
    spots: [],
    hotels: [],
    days:'',
    image: null
  });

  const [rating, setRating] = useState(0); // State for rating


  const fetchData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const fetchImage = (event) => {
    setData({ ...data, image: event.target.files[0] });
  };

  const addSpot = () => {
    const newSpot = { name: '', spotimage: null };
    setData({ ...data, spots: [...data.spots, newSpot] });
  };




  const addHotel = () => {
    const newHotel = { name: '', hotelimage: null };
    setData({ ...data, hotels: [...data.hotels, newHotel] });
  };

  const updateSpot = (index, key, value) => {
    const updatedSpots = [...data.spots];
    updatedSpots[index][key] = value;
    setData({ ...data, spots: updatedSpots });
    console.log(data, '-=================');
  };

  const updateHotel = (index, key, value) => {
    const updatedHotels = [...data.hotels];
    updatedHotels[index][key] = value;
    setData({ ...data, hotels: updatedHotels });
  };




  const handleRatingChange = (value) => {
    setRating(value);
  };


  const submitData = async (event) => {
    event.preventDefault();
    console.log(data, '=================');
    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('days', data.days);
    formData.append('description', data.description);
    formData.append('destination', data.destination);
    formData.append('price', data.price);
    formData.append('userid', id);
    formData.append('rating', rating);


    data.spots.forEach((spot, index) => {
      formData.append(`spotimage[${index}]`, spot.spotimage);
      formData.append(`names[${index}]`, spot.name);
    });
    data.hotels.forEach((hotel, index) => {
      formData.append(`hotelimage[${index}]`, hotel.hotelimage);
      formData.append(`namess[${index}]`, hotel.name);
    });
  
   

    try {
      const response = await axios.post(`${baseUrl}/addpackage`, formData);
      console.log('response', response.data);
      toast.success('Success');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add package');
    }
  };

  return (
    <>
      <h3 className='flex heading mt-4'>Add Packages</h3>
      <div className='flex'>
        <div className='box'>
          <Form className='mt-3' onSubmit={submitData}>
            <Form.Group className='mb-2' controlId='exampleForm.ControlInput1'>
              <Form.Label><b>Upload Image</b></Form.Label>
              <Form.Control type='file' name='image' placeholder='image' onChange={fetchImage} />
            </Form.Group>
            <Form.Group className='mb-2' controlId='exampleForm.ControlInput1'>
              <Form.Label><b>Destination</b></Form.Label>
              <Form.Control type='text' name='destination' placeholder='destination' onChange={fetchData} />
            </Form.Group>
            <Form.Group className='mb-2' controlId='exampleForm.ControlInput1'>
              <Form.Label><b>Description</b></Form.Label>
              <Form.Control type='text' name='description' placeholder='description' onChange={fetchData} />
            </Form.Group>

            <Form.Group className='mb-2' controlId='exampleForm.ControlInput1'>
              <Form.Label><b>Price</b></Form.Label>
              <Form.Control type='text' name='price' placeholder='price' onChange={fetchData} />
            </Form.Group>
            

            <Form.Group className='mb-2' controlId='exampleForm.ControlInput1'>
              <Form.Label><b>Available Day</b></Form.Label>
              <Form.Control type='text' name='days' placeholder='days' onChange={fetchData} />
            </Form.Group>

            

            <div className='mb-3'>
              <h5>Spots</h5>
              {data.spots.map((spot, index) => (
                <div key={index} className='mb-2'>
                  <Form.Group controlId={`spotName${index}`}>
                    <Form.Label><b>Spot Name</b></Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Spot Name'
                      value={spot.name}
                      onChange={(e) => updateSpot(index, 'name', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`spotImage${index}`}>
                    <Form.Label><b>Spot Image</b></Form.Label>
                    <FileBase64
                      multiple={false}
                      onDone={({ base64 }) => updateSpot(index, 'spotimage', base64)}
                    />

                  </Form.Group>




                </div>
              ))}


           
              <button type='button' className='btn btn-secondary' onClick={addSpot}>Add Spot</button>
            </div>




            <div className='mb-3'>
              <h5>Hotels</h5>
              {data.hotels.map((hotel, index) => (
                <div key={index} className='mb-2'>
                  <Form.Group controlId={`hotelName${index}`}>
                    <Form.Label><b>Hotel Name</b></Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Hotel Name'
                      value={hotel.name}
                      onChange={(e) => updateHotel(index, 'name', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`hotelImage${index}`}>
                    <Form.Label><b>Hotel Image</b></Form.Label>
                    <FileBase64
                      multiple={false}
                      onDone={({ base64 }) => updateHotel(index, 'hotelimage', base64)}
                    />
                  </Form.Group>
                </div>
              ))}
              <button type='button' className='btn btn-secondary' onClick={addHotel}>Add Hotel</button>
            </div>




            <div>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => handleRatingChange(index + 1)}
                  style={{ fontSize: '35px', cursor: 'pointer' }}
                >
                  {index + 1 <= rating ? '★' : '☆'}
                </span>
              ))}
            </div>




            <div className='flex'>
              <button type='submit' className='btn bg'>Submit</button>
            </div>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Addpackages;







