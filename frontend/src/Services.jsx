import React from 'react'
import Card from 'react-bootstrap/Card';
import { FaHospital } from "react-icons/fa";
import { SiHotelsdotcom } from "react-icons/si";
import { RiCustomerService2Line } from "react-icons/ri";
import { MdEmojiTransportation } from "react-icons/md";
import { MdPolicy } from "react-icons/md";
import { BsPersonStanding } from "react-icons/bs";
import { MdOutlineSecurity } from "react-icons/md";
import { MdOutlineTour } from "react-icons/md";


const Services = () => {
  return (
    <div style={{marginTop:'120px'}}>
    <h4 className='flex  heading' >Why We Are Different</h4> 
    
    <div className='flex mt-4' style={{gap:"80px"}}>
    <Card style={{ width: '18rem'}}>
      <Card.Body>
        <SiHotelsdotcom className='icons mb-3'/>
        <Card.Title>Accommodation</Card.Title>
        <Card.Text>
        Managing hotels and lodging for travelers, ensuring they have a comfortable stay.        </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <RiCustomerService2Line  className='icons mb-3'/>
        <Card.Title>Customer Service</Card.Title>
        <Card.Text>
        Providing assistance and support to travelers before, during, and after their trips to ensure a smooth and pleasant experience.</Card.Text>
    </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
          <MdEmojiTransportation  className='icons mb-3'/>
        <Card.Title>Transportation</Card.Title>
        <Card.Text>
        Facilitating travel by coordinating transportation options such as flights, trains, buses, and taxis for tourists.</Card.Text>
    </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <FaHospital  className='icons mb-3'/>
        <Card.Title>Hospitality</Card.Title>
        <Card.Text>
        Ensuring visitors feel welcomed and comfortable by offering services such as accommodation, dining, and leisure facilities.          </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <MdOutlineTour  className='icons mb-3'/>
        <Card.Title>Adventure Tourism</Card.Title>
        <Card.Text>
        Offering thrilling activities like hiking and wildlife safaris for adventurous travelers.        </Card.Text>
    </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <MdPolicy  className='icons mb-3'/>
        <Card.Title>Policy and Regulation</Card.Title>
        <Card.Text>

       These services work together to create enjoyable experiences for travelers while supporting the growth and sustainability of tourism destinations.                </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <BsPersonStanding  className='icons mb-3'/>
        <Card.Title>Tour Guides</Card.Title>
        <Card.Text>
        Providing knowledgeable guides who offer insights and information about the destination's history, culture, and attractions.        </Card.Text>
    </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <MdOutlineSecurity  className='icons mb-3'/>
        <Card.Title>Safety and Security</Card.Title>
        <Card.Text>
        Implementing measures to keep tourists safe, including emergency response plans, security checks, and safety regulations.           </Card.Text>
      </Card.Body>
    </Card>
   
   </div>
   </div>
  )
}

export default Services