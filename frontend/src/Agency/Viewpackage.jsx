
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CiEdit } from "react-icons/ci";
import { MdAutoDelete } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Button from 'react-bootstrap/Button';
import { baseUrl } from '../Url';


const Viewpackage = () => {
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const userid = localStorage.getItem('id')
    const viewpackages = async () => {
      let response = await axios.get(`${baseUrl}/viewpackagelists/${userid}`)
      console.log('response', response.data);
      setData(response.data)
    }
    viewpackages()
  }, [refresh])
  console.log("packagedetailssss", data);

  const handledelete = async (id) => {
    setRefresh(!refresh);
    let response = await axios.delete(`${baseUrl}/deletepackage/${id}`);
    console.log('response', response);
    if (response) {
      alert('Are you sure?');
    }
  };


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

    // <>
    //   <h2 className='flex heading mt-3'>packages</h2>
    //   {data && (
    //     <div>
    //       {data.map((item) => (


    //         <div className=''>
    //           <div className='flex mt-5' >
    //             <img style={{
    //               height: '320px',
    //               width: '410px',
    //               borderTopLeftRadius:'20px',
    //               borderBottomLeftRadius:'20px',
    //               boxShadow:'0px 8px,10px  '


    //             }} src={`http://localhost:7000/uploads/${item.image}`} alt="" />

    //             <div className='package'>

    //               <h3 className='mt-5 ms-3'><FaLocationDot style={{ color: 'darkorange' }} />{item.destination}</h3>
    //               <p className='ms-5'> Ratings:<span> {renderStars(item.rating)} </span></p>
    //               <b className='ms-5'>${item.price}</b>
    //               <Link to={`/agency/packagedetailss/${item._id}`} >   <button className='ms-3'
    //                 style={{
    //                   backgroundColor: 'darkorange',
    //                   color: 'white', border: 'none',
    //                   height: '40px', width: '150px'

    //                 }}>ReadMore</button></Link>

    //               <div style={{ display: 'flex ', justifyContent: 'space-evenly', gap: '40px', marginTop: '30px', marginBottom: '10px' }}>

    //                 <Link to={`/agency/updatepackage/${item._id}`} >
    //                   <b style={{ color: 'green', fontSize: '25px' }}><CiEdit /></b>
    //                 </Link>

    //                 <b style={{ color: 'red', fontSize: '25px' }} onClick={() => handledelete(item._id)} ><MdAutoDelete /></b>

    //               </div>

    //             </div>


    //           </div>
    //         </div>





    //       ))}
    //     </div>

    //   )}
    // </>

<>
<h4 className='flex heading mt-3'>packages</h4>
    < div className='flex m-5  ' style={{gap:'50px'}}>
      
      {data.map((item) => (
        <div className=''>
          <Card style={{ width: '19em',height:'23.7rem' }} className='dest2 package'>
            <div style={{ position: 'relative' }}>
              <Card.Img variant="top" src={`${baseUrl}/uploads/${item.image}`} style={{height:'12rem'}} />
              <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', padding: '5px', textAlign: 'center', background: 'rgba(0, 0, 0, 0.5)' }}>
                <span style={{ fontWeight: 'bold', color: 'white' }}>{item.destination}</span>
              </div>
            </div>
            <Card.Body>
            <h6 className='flex'>${item.price} </h6>

              <span className='flex'> {renderStars(item.rating)} </span>

              <div className='flex'>
                <Link to={`/agency/packagedetailss/${item._id}`}  >   <Button variant="primary" style={{marginTop:'-10px'}}>Read More</Button></Link>
              </div>

              
             <div className='mt-2' style={{ display: 'flex ', justifyContent: 'space-evenly', gap: '130px', marginBottom: '10px' }} >
              <Link to={`/agency/updatepackage/${item._id}`} >
                <b style={{ color: 'green', fontSize: '25px' }}><CiEdit /></b>
              </Link>
              <b style={{ color: 'red', fontSize: '25px' }} onClick={() => handledelete(item._id)} ><MdAutoDelete /></b>
              </div>

            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
    </>

  )
}

export default Viewpackage


