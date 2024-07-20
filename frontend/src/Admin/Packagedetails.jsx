
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { baseUrl } from '../Url'

const Packagedetailss = () => {
    const { id } = useParams()
    const [detail, setdetail] = useState('')
    const [daydetail, setdaydetail] = useState('')

    useEffect(() => {
        const detailpackage = async () => {
            let response = await axios.get(`${baseUrl}/detailpackage/${id}`)
            setdetail(response.data)
        }
        detailpackage()
    }, [])
    console.log('packagedetails', detail);


    useEffect(() => {
        const viewdaydetails = async () => {
            let response = await axios.get(`${baseUrl}/viewdaydetails`)
            setdaydetail(response.data)
        }
        viewdaydetails()
    }, [])
    console.log("day details:",daydetail);



    
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
    return (
       
    < div className='detail  back2'>
    <div style={{position:"relative"}}>
        <img className=' ' src={`${baseUrl}/uploads/${detail.image}`} alt="" style={{height:'600px',width:'100%'}}/>
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





      <Link to='/admin/viewdetailsss'>
        <button className='bg' style={{
          color: 'white', padding: '8px', borderRadius: '18px', border: 'none'
        }}>Food & Accomodation</button>
      </Link>



    </div>
    </div>
    )
}

export default Packagedetailss
