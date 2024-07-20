import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { MdAutoDelete } from "react-icons/md";
import { baseUrl } from '../Url';


const Packageview = () => {
    const [data,setdata]=useState('')
    const[refresh,setRefresh]=useState(false)
    useEffect(()=>{
        const viewpackage=async()=>{
            let response=await axios.get(`${baseUrl}/viewpackages`)
            console.log('response',response);
            setdata(response.data)
        }
        viewpackage()
    },[refresh])

    const handledelete = async (id) => {
        setRefresh(!refresh);
        let response = await axios.delete(`${baseUrl}/deletepackage/${id}`);
        console.log('response', response);
        if (response) {
          alert('Are you sure?');
        }
      };
  return (


    <div className='me-3 ms-3'>
    <h3 className='flex heading mt-5 '>Packages</h3>
        {data && (
            <div className='flex mt-4' style={{gap:"50px"}}>
                {data.map((item) => (
                    <>
                        <Card style={{ width: '19rem',height:'19rem' }} className='package dest2' >
                            <Card.Img variant="top" src={`${baseUrl}/uploads/${item.image}`} style={{height:'180px'}} />
                            <Card.Body className=''>
                                <Card.Title className='flex'>{item.destination}</Card.Title>
                                <div  className='flex mt-3 justify-content-evenly ' >
                                {/* <Button variant="primary"style={{color:'white',width:'120px',height:'37px'}} className='bg'> */}
                                    <Link to={`/admin/packagedetails/${item._id}`} style={{color:'black'}} >ReadMore</Link>
                                    <b style={{color:'red',fontSize:'25px'}} onClick={()=>handledelete(item._id)} ><MdAutoDelete/></b>


                                </div>
                    
                            </Card.Body>
                           
                        </Card>
                    </>
                ))}
            </div>
        )}

    </div>
  )
}

export default Packageview