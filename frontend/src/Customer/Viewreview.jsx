import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { baseUrl } from '../Url'

const Viewreview = () => {
    const [data, setdata] = useState([])
    const [currentPage, setCurrentPage] = useState(1); // Start from page 2 to fetch next set of bookings

    const [itemsPerPage] = useState(5); // represents the number of bookings to display per page, which is set to 10.

    useEffect(() => {

        const fetchreviews = async () => {
            let response = await axios.get(`${baseUrl}/viewreviews`)
            console.log('reviews', response.data);
            setdata(response.data)
        }
        fetchreviews()
    }, [itemsPerPage,,currentPage])
    console.log('data', data);
    const renderStars = (rating) => {
       
        const filledStars = '★'.repeat(rating);//creates an array
        const emptyStars = '☆'.repeat(5 - rating);
        return (
            <p>
                <span style={{ color: '#FFD700',fontSize:'30px' }}>{filledStars}</span> {/* Dark Yellow Color */}
                <span style={{ color: 'gray',fontSize:'30px'  }}>{emptyStars}</span>
            </p>
        );
      };


    return (
     <div style={{marginTop:'100px'}} >
        
        <div className=' mt-5' >
            {data && (
                < div className='flex   justify-content-between' style={{marginLeft:'180px',marginRight:'180px'}}>
                    {data.map((item) => (
                        < div className='mt-4'>
                            <Card style={{ width: '26rem',height:'10rem',border:'none',boxShadow:'0px 8px 10px lightgrey'}}>
                                <Card.Body>
                                    <div className='flex justify-content-lg-start' style={{gap:'10px'}}>
                                        <Card.Img variant="top" src={`${baseUrl}/uploads/${item.image}`} className='reviewimg' />
                                        <b>{item.name} </b>
                                    </div>
                                    
                                       <p style={{fontSize:'15px'}}>{item.feedback}</p> 
                                        <> {renderStars(item.rating)}</>                                      
                                  

                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>


            )}
        </div>
        </div>

    )
}

export default Viewreview



