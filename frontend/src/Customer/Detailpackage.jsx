import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Booking from './Booking'; // Import the Booking component
import { baseUrl } from '../Url';

const Detailpackage = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/detailpackage/${id}`);
        setDetail(response.data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };

    fetchDetail();
  }, [id]);




  const renderStars = (rating) => {

    const filledStars = '★'.repeat(rating);//creates an array
    const emptyStars = '☆'.repeat(5 - rating);
    return (
      <p>
        <span style={{ color: '#FFA500', fontSize: '30px' }}>{filledStars}</span> {/* Dark Yellow Color */}
        <span style={{ color: 'gray', fontSize: '30px' }}>{emptyStars}</span>
      </p>
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (


<div className='detail  back2'>
  <div style={{ position: "relative", height: '600px', width: '100%' }}>
  <img className='' src={`${baseUrl}/uploads/${detail.image}`} alt="" style={{ height: '100%', width: '100%' }} />
  <div className='packagedetail heading' style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white' }}>
    <div style={{ fontSize: '30Px' }}>{detail.destination}</div>
    <p style={{ fontSize: '20px', marginTop: '10px' }}>  {detail.description}</p>
  </div>

            
      </div>
      <b className='flex mt-3'>Only ${detail.price} </b>
      <h4 className='flex'><mark> {detail.days} Day package</mark></h4>
{/* 

      <div className='flex m-5 des' style={{fontSize:'20px' ,fontFamily:"inherit" }}>
                 {detail.description} </div> */}
    <div>


     
        <h4 className='heading flex mb-4 '>Main Spots:</h4>
        <div style={{ color: 'black', width: '70%', marginTop: '20px', marginLeft: '220px' }}><hr /></div>
        <div className='flex ' style={{ gap: "40px" }}>
          {detail.spots && detail.spots.map((spot, index) => (
            <div key={index} className='dest-container'>
         
              <img src={spot.spotimage} className='dest' alt={`Spot ${index + 1}`} style={{ width: '360px', height: '260px' }} />
              <h6 className='flex mt-4 dest-name'>{spot.name}</h6>
            </div>
          ))}
        </div>
      </div>



      <div>
        <h4 className='heading flex mb-4 mt-5 '>Hotels:</h4>
        <div style={{ color: 'black', width: '70%', marginTop: '20px', marginLeft: '220px' }}><hr /></div>
        <div className='flex' style={{ gap: "40px" }}>
          {detail.hotels && detail.hotels.map((hotel, index) => (
            <div key={index} className='dest-container'>

              <img src={hotel.hotelimage} alt={`Hotel ${index + 1}`} className='dest' style={{ width: '360px', height: '260px' }} />
              <h6 className='flex mt-2 '>{hotel.name}</h6>
              <p className=' flex  '> {renderStars(detail.rating)} </p>
              

            </div>
          
        

          ))}
        </div>
      </div>

     

 

      <div className='flex mb-5 mt-5' style={{ gap: '30px' }}>


      <Link to='/customer/review'><button className='bg' style={{
          color: 'white', padding: '8px'
          , borderRadius: '18px', border: 'none'
        }}>AddFeedback</button></Link>


        <button className='bg' style={{
          color: 'white', padding: '8px', borderRadius: '18px', border: 'none'
        }} onClick={openModal}>Book Now</button>


        <Link to='/customer/viewdetails'>
          <button className='bg' style={{
            color: 'white', padding: '8px', borderRadius: '18px', border: 'none'
          }}>Food & Accomodation</button>
        </Link>



      </div>
      
      <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="custom-modal"
          overlayClassName="custom-overlay"
          style={{
            content: {
              marginTop: '80px',
          
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              position: 'fixed',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              maxHeight: '90vh',
              overflow: 'hidden' // Prevent scrollbar
            }
          }}
        >
          <div className="custom-modal-content">
            <button
              className="custom-close-button"
              onClick={closeModal}
            >
              &times;
            </button>
            <Booking />
          </div>
        </Modal>
    </div>
  );
};

export default Detailpackage;





