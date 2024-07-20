// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Card } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';
// import { FaLocationDot } from "react-icons/fa6";
// import { baseUrl } from '../Url';


// const Viewpackages = () => {
//     const [data, setdata] = useState([])
//     useEffect(() => {
//         const viewpackages = async () => {
//             let response = await axios.get(`${baseUrl}/viewpackages`)
//             setdata(response.data)
//         }
//         viewpackages()
//     }, [])
//     console.log('response', data);




    
//   const renderStars = (rating) => {

//     const filledStars = '★'.repeat(rating);//creates an array
//     const emptyStars = '☆'.repeat(5 - rating);
//     return (
//       <p>
//         <span style={{ color: '#FFA500', fontSize: '30px' }}>{filledStars}</span> {/* Dark Yellow Color */}
//         <span style={{ color: 'gray', fontSize: '30px' }}>{emptyStars}</span>
//       </p>
//     );
//   };
//     return (
        
//   <div  style={{marginTop:'100px'}}>
//   <h4 className='flex heading mt-3'>packages</h4>
//       <div className='flex m-5 ' style={{gap:'50px'}}>
        
//         {data.map((item) => (
//           <div className=''>
//             <Card style={{ width: '19em',height:'21.5rem' }} className='dest2 package ' >
//               <div style={{ position: 'relative' }}>
//                 <Card.Img variant="top" src={`${baseUrl}/uploads/${item.image}`} style={{height:'12rem'}} />
//                 <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', padding: '5px', textAlign: 'center', background: 'rgba(0, 0, 0, 0.5)' }}>
//                   <span style={{ fontWeight: 'bold', color: 'white' }}>{item.destination}</span>
//                 </div>
//               </div>
//               <Card.Body>
//                 <h6 className='flex'>${item.price} </h6>
//                 <span className='flex'> {renderStars(item.rating)} </span>
  
//                 <div className='flex'>
//                   <Link to={`/customer/detailpackage/${item._id}`}  >   <Button variant="primary" style={{marginTop:'-10px'}}>Read More</Button></Link>
//                 </div>
  
              
  
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//       </div>




//     )
// }

// export default Viewpackages




import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { baseUrl } from '../Url';

const Viewpackages = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const viewpackages = async () => {
            try {
                const response = await axios.get(`${baseUrl}/viewpackages`);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        viewpackages();
    }, []);

    const renderStars = (rating) => {
        const filledStars = '★'.repeat(rating); // creates an array
        const emptyStars = '☆'.repeat(5 - rating);
        return (
            <p>
                <span style={{ color: '#FFA500', fontSize: '30px' }}>{filledStars}</span> {/* Dark Yellow Color */}
                <span style={{ color: 'gray', fontSize: '30px' }}>{emptyStars}</span>
            </p>
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading packages: {error.message}</p>;

    return (
        <div style={{ marginTop: '100px' }}>
            <h4 className='flex heading mt-3'>Packages</h4>
            <div className='flex m-5' style={{ gap: '50px' }}>
                {data.map((item) => (
                    <div key={item._id}>
                        <Card style={{ width: '19em', height: '21.5rem' }} className='dest2 package'>
                            <div style={{ position: 'relative' }}>
                                <Card.Img variant="top" src={`${baseUrl}/uploads/${item.image}`} style={{ height: '12rem' }} />
                                <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', padding: '5px', textAlign: 'center', background: 'rgba(0, 0, 0, 0.5)' }}>
                                    <span style={{ fontWeight: 'bold', color: 'white' }}>{item.destination}</span>
                                </div>
                            </div>
                            <Card.Body>
                                <h6 className='flex'>${item.price}</h6>
                                <span className='flex'>{renderStars(item.rating)}</span>
                                <div className='flex'>
                                    <Link to={`/customer/detailpackage/${item._id}`}>
                                        <Button variant="primary" style={{ marginTop: '-10px' }}>Read More</Button>
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Viewpackages;
