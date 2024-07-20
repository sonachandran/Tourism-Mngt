import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { baseUrl } from '../Url'

const Viewreviews = () => {
    const [data, setdata] = useState('')
    useEffect(() => {

        const fetchreviews = async () => {
            let response = await axios.get(`${baseUrl}/viewreviews`)
            console.log('reviews', response.data);
            setdata(response.data)
        }
        fetchreviews()
    }, [])
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
    <>       
        <div className='ms-5 me-5 mt-5'>
            {data && (
                < div className='flex  justify-content-between'>
                    {data.map((item) => (
                        < div className='mt-4'>
                            <Card style={{ width: '26rem',height:'10rem'}}>
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
        </>

    )
}

export default Viewreviews



