// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'

// const Detailpackage = () => {
//   const { id } = useParams()
//   const [detail, setdetail] = useState('')

//   useEffect(() => {
//     const detailpackage = async () => {
//       let response = await axios.get(`http://localhost:7000/detailpackage/${id}`)
//       setdetail(response.data)
//     }
//     detailpackage()
//   }, [])
//   console.log('packagedetails', detail);



// const renderStars = (rating) => {

//   const filledStars = '★'.repeat(rating);//creates an array
//   const emptyStars = '☆'.repeat(5 - rating);
//   return (
//     <p>
//       <span style={{ color: '#FFA500', fontSize: '30px' }}>{filledStars}</span> {/* Dark Yellow Color */}
//       <span style={{ color: 'gray', fontSize: '30px' }}>{emptyStars}</span>
//     </p>
//   );
// };




//   return (
// < div className=''>
//   <h3 className='flex heading mt-5' style={{ fontSize: '35px', letterSpacing: '5px' }}><b>{detail.destination}</b></h3>

//   <div className='flex '><img className='img-fluid ' src={`http://localhost:7000/uploads/${detail.image}`} alt="" style={{ height: '450px' }} /></div>
//   <b className='flex mt-3'>Only ${detail.price} </b>

//   <div className='flex m-5 ' style={{ fontFamily: 'inherit' }}>
//     <h4 >About {detail.destination}</h4>
//     {detail.description} </div>


//     <div>
//             <h4 className='heading flex mb-4 '>Main Spots:</h4>
//             <div style={{color:'black',width:'70%',marginTop:'20px',marginLeft:'220px'}}><hr /></div> 
//             <div className='flex'style={{gap:"40px"}}>
//             {detail.spots && detail.spots.map((spot, index) => (
//                 <div key={index}>

//                     <img src={spot.spotimage} alt={`Spot ${index + 1}`} style={{ width: '320px', height: '300px' }} />
//                     <h6 className='flex mt-2'>{spot.name}</h6>
//                 </div>
//             ))}
//             </div>
//         </div>



//         <div>
//             <h4 className='heading flex mb-4 mt-5 '>Hotels:</h4>
//             <div style={{color:'black',width:'70%',marginTop:'20px',marginLeft:'220px'}}><hr /></div> 
//             <div className='flex'style={{gap:"40px"}}>
//             {detail.hotels && detail.hotels.map((hotel, index) => (
//                 <div key={index}>

//                     <img src={hotel.hotelimage} alt={`Hotel ${index + 1}`} style={{ width: '320px', height: '300px' }} />
//                     <h6 className='flex mt-5'>{hotel.name}</h6>
//                     <p className=' flex '> {renderStars(detail.rating)} </p>



//                 </div>

//             ))}
//             </div>
//         </div>




//       <div className='flex mb-5 mt-5' style={{gap:'30px'}}>


        // <Link to='/customer/review'><button className='bg' style={{
        //   color: 'white', padding: '8px'
        //   , borderRadius: '18px', border: 'none'
        // }}>AddFeedback</button></Link>

//       <Link to='/customer/booking'><button className='bg' style={{
//           color: 'white', padding: '8px'
//           , borderRadius: '18px', border: 'none'
//         }}>BookNow</button></Link>
//         <Link to='/customer/viewdetails'><button className='bg' style={{
//           color: 'white', padding: '8px'
//           , borderRadius: '18px', border: 'none'
//         }}>FOOD & ACCOMODATION</button></Link>




//       </div>
//     </div>

//   )
// }

// export default Detailpackage;



import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Booking from './Booking'; // Import the Booking component
import { toast,ToastContainer } from 'react-toastify';

const Detailpackagess= () => {
  const { id } = useParams();
  const Navigate=useNavigate()
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

  const handlebutton=(event)=>{
    toast.error('Please Register')
  }

  return (


    < div className='detail  back2'>
      <div style={{position:"relative"}}>
          <img className=' ' src={`http://localhost:7000/uploads/${detail.image}`} alt="" style={{height:'600px',width:'100%'}}/>
             <div className='packagedetail heading ' >
                <div> {detail.destination}</div>
             </div>
            
      </div>
      <b className='flex mt-3'>Only ${detail.price} </b>
      <h4 className='flex'><mark> {detail.days} Day package</mark></h4>


      <div className='flex m-5 des' style={{fontSize:'20px' ,fontFamily:"inherit" }}>
                 {detail.description} </div>
             <div>


     
        <h4 className='heading flex mb-4 '>Main Spots:</h4>
        <div style={{ color: 'black', width: '70%', marginTop: '20px', marginLeft: '220px' }}><hr /></div>
        <div className='flex' style={{ gap: "40px" }}>
          {detail.spots && detail.spots.map((spot, index) => (
            <div key={index}>

              <img src={spot.spotimage} className='' alt={`Spot ${index + 1}`} style={{ width: '320px', height: '300px' }} />
              <h6 className='flex mt-4'>{spot.name}</h6>
            </div>
          ))}
        </div>
      </div>



      <div>
        <h4 className='heading flex mb-4 mt-5 '>Hotels:</h4>
        <div style={{ color: 'black', width: '70%', marginTop: '20px', marginLeft: '220px' }}><hr /></div>
        <div className='flex' style={{ gap: "40px" }}>
          {detail.hotels && detail.hotels.map((hotel, index) => (
            <div key={index}>

              <img src={hotel.hotelimage} alt={`Hotel ${index + 1}`} className='' style={{ width: '320px', height: '300px' }} />
              <h6 className='flex mt-5'>{hotel.name}</h6>
              <p className=' flex '> {renderStars(detail.rating)} </p>

            </div>

          ))}
        </div>
      </div>

     

 

      <div className='flex mb-5 mt-5' style={{ gap: '30px' }}>


     


        <button className='bg' style={{
          color: 'white', padding: '8px', borderRadius: '18px', border: 'none'
        }}onClick={handlebutton} >Book Now</button>


        <Link to='/customer/viewdetails'>
          <button className='bg' style={{
            color: 'white', padding: '8px', borderRadius: '18px', border: 'none'
          }}>Food & Accomodation</button>
        </Link>



      </div>
      <ToastContainer/>
   
    </div>
  );
};

export default Detailpackagess;
